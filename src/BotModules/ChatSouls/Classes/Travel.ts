import { return_CS_EquipmentTypes, return_CS_SecondaryStates_EQUIPMENT_INVENTORY } from "../Globals/typesUtilsFunctions.js"
import Battle from "./Battle.js"
import Enemie from "./EntityChilds/Enemie.js"
import Player from "./EntityChilds/Player.js"
import SendMessage_UI from "./SendMessage.js"

export default class Travel {

    public static to_Explore(player: Player, menuMessage: string): void                 {_Explore.to_Explore(player, menuMessage)}
    public static to_NewBattle(player: Player)                                          {_Explore.to_NewBattle(player)}
    public static to_HabilitiesUsageMenu(player: Player)                                {_Explore.to_HabilitiesUsageMenu(player)}
    public static to_CurrentBattle(player: Player)                                      {_Explore.to_CurrentBattle(player)}

    public static to_FirePit(player: Player, menuMessage: string): void                 {_FirePit.to_FirePit(player, menuMessage)}
    public static to_HabilitieManagementMenu(player: Player, menuMessage: string): void {_FirePit.to_HabilitieManagementMenu(player, menuMessage)}
    public static to_HabilitieEquipMenu(player: Player, menuMessage: string): void      {_FirePit.to_HabilitieEquipMenu(player, menuMessage)}
    public static to_HabilitieUnequipMenu(player: Player, menuMessage: string): void    {_FirePit.to_HabilitieUnequipMenu(player, menuMessage)}
    public static to_StatisticsMenu(player: Player, menuMessage: string)                {_FirePit.to_StatisticsMenu(player, menuMessage)}
    public static to_AttributeUpgradeMenu(player: Player, menuMessage: string): void    {_FirePit.to_AttributeUpgradeMenu(player, menuMessage)}

    public static to_EquipmentInventory(player: Player, menuMessage: string): void      {_Equipments.to_EquipmentInventory(player, menuMessage)}
    public static to_Equipments(player: Player, menuMessage: string): void              {_Equipments.to_Equipments(player, menuMessage)}
    public static to_EquipmentMenu(player: Player, menuMessage: string): void           {_Equipments.to_EquipmentMenu(player, menuMessage)}
    public static to_MeleeMenu(player: Player, menuMessage: string): void               {_Equipments.to_MeleeMenu(player, menuMessage)}
    public static to_LongRangeMenu(player: Player, menuMessage: string): void           {_Equipments.to_LongRangeMenu(player, menuMessage)}
    public static to_HelmetMenu(player: Player, menuMessage: string): void              {_Equipments.to_HelmetMenu(player, menuMessage)}
    public static to_BodyArmorMenu(player: Player, menuMessage: string): void           {_Equipments.to_BodyArmorMenu(player, menuMessage)}
    public static to_GlovesMenu(player: Player, menuMessage: string)                    {_Equipments.to_GlovesMenu(player, menuMessage)}
    public static to_BootsMenu(player: Player, menuMessage: string): void               {_Equipments.to_BootsMenu(player, menuMessage)}
}

class _FirePit {

    public static to_FirePit(player: Player, menuMessage: string): void {
    
        player.recoverHP("maxHP")
        player.ressurrect()
        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "RESTING_ON_FIRE_PIT"
        })
        SendMessage_UI.firePit(player, menuMessage)
    }

    public static to_HabilitieManagementMenu(player: Player, menuMessage: string): void {

        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "HABILITIE_MAIN_MENU"
        })
        SendMessage_UI.habilitieManagementMenu(player, menuMessage)
    }

    public static to_HabilitieEquipMenu(player: Player, menuMessage: string): void {
        
        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "HABILITIE_EQUIP_MENU"
        })
        SendMessage_UI.habilitieEquipMenu(player, menuMessage)
    }

    public static to_HabilitieUnequipMenu(player: Player, menuMessage: string): void {

        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "HABILITIE_UNEQUIP_MENU"
        })
        SendMessage_UI.habilitieUnequipMenu(player, menuMessage)
    }

    public static to_StatisticsMenu(player: Player, menuMessage: string) {
    
        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "STATS_MENU"
        })
        SendMessage_UI.statisticsMenu(player, menuMessage)
    }

    public static to_AttributeUpgradeMenu(player: Player, menuMessage: string): void {

        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "ATRIBUTE_UPGRADE"
        })
        SendMessage_UI.attributeUpgradeMenu(player, menuMessage)
    }
}

class _Explore {

    public static to_Explore(player: Player, menuMessage: string): void {
        player.setCurrentState({
            primary: "EXPLORING",
            secondary: "IDLE"
        })
        SendMessage_UI.idle(player, menuMessage)
    }

    public static to_NewBattle(player: Player) {
    
        player.setCurrentState({
            primary: "EXPLORING",
            secondary: "BATTLE"
        })

        const enemie = Enemie.instantiateRandomEnemie(player)
        const enemieName = enemie.getName()
        const battle = Battle.initializeBattle(player, enemie)
        const turn = battle.getTurn()

        let advantageMessage = ""
        
        turn === 1
        ? advantageMessage += `e voc?? tem a vantagem de ataque `
        : advantageMessage += `e ele tem a vantagem de ataque `

        const message = `Voc?? encontrou um ${enemieName} ${advantageMessage}`
        
        SendMessage_UI.battle(battle, message)
    }

    public static to_CurrentBattle(player: Player) {

        const battle = Battle.getBattleByName(player.getName())

        player.setCurrentState({
            primary: "EXPLORING",
            secondary: "BATTLE"
        })

        const message = `Voc?? voltou ao menu de batalha`
        
        SendMessage_UI.battle(battle, message)
    }

    public static to_HabilitiesUsageMenu(player: Player) {

        player.setCurrentState({
            primary: "EXPLORING",
            secondary: "BATTLE_HABILITIES"
        })

        SendMessage_UI.battle_habilitiesUsage(player, `
            Escolha uma habilidade
        `)
    }
}

class _Equipments {

    public static to_EquipmentInventory(player: Player, menuMessage: string): void {

        const primaryState = player.getCurrentState().primary    
        const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])
    
        if (player.isInventoryEquipmentsTypeEmpty(equipmentType)) {
            SendMessage_UI.equipmentMenu(player, `Seu invent??rio est?? vazio.`)
            return
        }
    
        player.setCurrentState({
            primary: primaryState,
            secondary: return_CS_SecondaryStates_EQUIPMENT_INVENTORY(equipmentType)
        })
        
        
        SendMessage_UI.equipmentInventory(
            player,
            menuMessage
        )
    }

    public static to_Equipments(player: Player, menuMessage: string): void {

        const primaryState = player.getCurrentState().primary
    
        player.setCurrentState({
            primary: primaryState,
            secondary: "EQUIPMENT"
        })
        SendMessage_UI.equipments(player, menuMessage)
    }

    public static to_EquipmentMenu(player: Player, menuMessage: string): void {

        const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])
    
        player.setCurrentState({
            primary: player.getCurrentState().primary,
            secondary: `${equipmentType} menu`
        })
        SendMessage_UI.equipmentMenu(player, menuMessage)
    }

    public static to_MeleeMenu(player: Player, menuMessage: string): void {

        player.setCurrentState({
            primary: player.getCurrentState().primary,
            secondary: "meleeWeapon menu"
        })
        SendMessage_UI.equipmentMenu(player, menuMessage)
    }

    public static to_LongRangeMenu(player: Player, menuMessage: string): void {

        player.setCurrentState({
            primary: player.getCurrentState().primary,
            secondary: "longRangeWeapon menu"
        })
        SendMessage_UI.equipmentMenu(player, menuMessage)
    }

    public static to_HelmetMenu(player: Player, menuMessage: string): void {

        player.setCurrentState({
            primary: player.getCurrentState().primary,
            secondary: "helmet menu"
        })
        SendMessage_UI.equipmentMenu(player, menuMessage)
    }

    public static to_BodyArmorMenu(player: Player, menuMessage: string): void {

        player.setCurrentState({
            primary: player.getCurrentState().primary,
            secondary: "bodyArmor menu"
        })
        SendMessage_UI.equipmentMenu(player, menuMessage)
    }

    public static to_GlovesMenu(player: Player, menuMessage: string) {

        player.setCurrentState({
            primary: player.getCurrentState().primary,
            secondary: "gloves menu"
        })
        SendMessage_UI.equipmentMenu(player, menuMessage)
    }

    public static to_BootsMenu(player: Player, menuMessage: string): void {

        player.setCurrentState({
            primary: player.getCurrentState().primary,
            secondary: "boots menu"
        })
        SendMessage_UI.equipmentMenu(player, menuMessage)
    }
}
import { return_CS_EquipmentTypes, return_CS_SecondaryStates_EQUIPMENT_INVENTORY } from "../Globals/typesUtilsFunctions.js"
import Battle from "./Battle.js"
import Enemie from "./EntityChilds/Enemie.js"
import Player from "./EntityChilds/Player.js"
import SendMessage_UI from "./SendMessage.js"

export default class Travel {

    public static to_Explore(player: Player, menuMessage: string): void {
        Travel_To_Explore.to_Explore(player, menuMessage)
    }

    public static to_Battle(player: Player) {
        Travel_To_Explore.to_Battle(player)
    }

    public static to_FirePit(player: Player, menuMessage: string): void {
        Travel_To_FirePit.to_FirePit(player, menuMessage)
    }

    public static to_StatisticsMenu(player: Player, menuMessage: string) {
        Travel_To_FirePit.to_StatisticsMenu(player, menuMessage)
    }

    public static to_AttributeUpgradeMenu(player: Player, menuMessage: string): void {
        Travel_To_FirePit.to_AttributeUpgradeMenu(player, menuMessage)
    }

    public static to_EquipmentInventory(player: Player, menuMessage: string): void {
        Travel_To_Equipments.to_EquipmentInventory(player, menuMessage)
    }

    public static to_Equipments(player: Player, menuMessage: string): void {
        Travel_To_Equipments.to_Equipments(player, menuMessage)
    }

    public static to_EquipmentMenu(player: Player, menuMessage: string): void {
        Travel_To_Equipments.to_EquipmentMenu(player, menuMessage)
    }

    public static to_MeleeMenu(player: Player, menuMessage: string): void {
        Travel_To_Equipments.to_MeleeMenu(player, menuMessage)
    }

    public static to_LongRangeMenu(player: Player, menuMessage: string): void {
        Travel_To_Equipments.to_LongRangeMenu(player, menuMessage)
    }

    public static to_HelmetMenu(player: Player, menuMessage: string): void {
        Travel_To_Equipments.to_HelmetMenu(player, menuMessage)
    }

    public static to_BodyArmorMenu(player: Player, menuMessage: string): void {
        Travel_To_Equipments.to_BodyArmorMenu(player, menuMessage)
    }

    public static to_GlovesMenu(player: Player, menuMessage: string) {
        Travel_To_Equipments.to_GlovesMenu(player, menuMessage)
    }

    public static to_BootsMenu(player: Player, menuMessage: string): void {
        Travel_To_Equipments.to_BootsMenu(player, menuMessage)
    }
}

class Travel_To_FirePit {

    public static to_FirePit(player: Player, menuMessage: string): void {
    
        player.recoverHP()
        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "RESTING_ON_FIRE_PIT"
        })
        SendMessage_UI.firePit(player, menuMessage)
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

class Travel_To_Explore {

    public static to_Explore(player: Player, menuMessage: string): void {
        player.setCurrentState({
            primary: "EXPLORING",
            secondary: "IDLE"
        })
        SendMessage_UI.idle(player, menuMessage)
    }

    public static to_Battle(player: Player) {
    
        player.setCurrentState({
            primary: "EXPLORING",
            secondary: "BATTLE"
        })

        const enemie = Enemie.instantiateRandomEnemie(player)
        const enemieName = enemie.getName()
        const battle = Battle.startBattle(player, enemie)
        const turn = battle.getTurn()

        let advantageMessage = ""
        
        turn === 1
        ? advantageMessage += `e você tem a vantagem de ataque `
        : advantageMessage += `e ele tem a vantagem de ataque `

        const message = `Você encontrou um ${enemieName} ${advantageMessage}`
        
        SendMessage_UI.battle(battle, message)
    }
}

class Travel_To_Equipments {

    public static to_EquipmentInventory(player: Player, menuMessage: string): void {

        const primaryState = player.getCurrentState().primary    
        const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])
    
        if (player.isInventoryEquipmentsTypeEmpty(equipmentType)) {
            SendMessage_UI.equipmentMenu(player, `Seu inventário está vazio.`)
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
import Emote from "../../../Twitch/Emotes.js"
import sendMessage from "../../../Twitch/sendMessageHandler.js"
import Battle from "./Battle.js"
import Player from "./EntityChilds/Player.js"

export default class SendMessage_UI {

    public static firePit(player: Player, menuMessage: string): void {

        const playerName = player.getName()
    
        sendMessage(
            `/w ${playerName} ${Emote._Getcamped_} ${menuMessage} 
            | 0. Levantar da fogueira
            | 1. Statísticas 
            | 2. Ver Equipamento 
            | 3. Menu de habilidades
            |`
        )
    }

    public static habilitieManagementMenu(player: Player, menuMessage: string): void {

        const playerName = player.getName()
        sendMessage(
            `/w ${playerName} ${Emote._GlitchNRG_} ${menuMessage} 
            | 0. Voltar 
            | 1. Equipar Habilidade 
            | 2. Desequipar Habilidade 
            |`
        )
    }

    public static habilitieEquipMenu(player: Player, menuMessage: string): void {

        const playerName = player.getName()
        sendMessage(
            `/w ${playerName} ${Emote._GlitchNRG_} ${menuMessage}
            | Digite <número do item> <número do slot a equipar>
            | ${player.getEmptySlotString()}
            | 0. Voltar ${player.getHabilitiesInventoryString()}
            |`
        )
    }

    public static habilitieUnequipMenu(player: Player, menuMessage: string): void {

        const playerName = player.getName()
        sendMessage(
            `/w ${playerName} ${Emote._GlitchNRG_} ${menuMessage}
            | 0. Voltar ${player.getHabilitiesString(true)}
            |`
        )
    }

    public static statisticsMenu(player: Player, menuMessage: string): void {

        const playerName = player.getName()
    
        sendMessage(
            `/w ${playerName} ${Emote._GlitchNRG_} ${menuMessage} 
            | 0. Voltar 
            | 1. Ver Atributos 
            | 2. Upar Atributos 
            |`
        )
    }

    public static attributeUpgradeMenu(playerInstance: Player, menuMessage: string): void {

        const playerName = playerInstance.getName()
        const level = playerInstance.getlevel()
        const souls = playerInstance.getSouls()
        const upgradeCost = playerInstance.getLevelUpgradeCost()
    
        sendMessage(
            `/w ${playerName} ${Emote._GlitchNRG_} ${menuMessage} 
            | Seu Level: ${level} 
            | Suas Almas: ${souls} 
            | Custo Upgrade: ${upgradeCost} almas 
            | 0. Voltar 
            | 1. UP Vitalidade 
            | 2. UP Agilidade 
            | 3. UP Força 
            | 4. UP Inteligência 
            | 5. Descrições do bônus de cada atributo 
            |`
        )
        return
    }

    public static idle(playerInstance: Player, menuMessage: string): void {

        const playerName = playerInstance.getName()
    
        sendMessage(
            `/w ${playerName} ${Emote._EarthDay_} ${menuMessage} 
            | 0. Voltar a fogueira
            | 1. Explorar 
            | 2. Procurar por recursos (Em progresso)
            | 3. Viajar (Em progresso)
            |`
        )
    }
    

    public static battle(battle: Battle, menuMessage: string): void {
    
        const player = battle.getPlayer()
        const playerName = player.getName()
    
        sendMessage(
            `/w ${playerName} ${Emote._Squid_} ${menuMessage} ${battle.getBattleStatusString()}. 
            | 0. Fugir 
            | 1. Ataque curto alcance
            | 2. Ataque longo alcance
            | 3. Habilidades
            |`
        )
        return
    }

    public static battle_habilitiesUsage(player: Player, menuMessage: string): void {

        const playerName = player.getName()
        const habilitiesString = player.getHabilitiesString(false)
        const playerMana = player.getCurrentMana()
        const playerMaxMana = player.getBaseStats().mana + player.getArmorStats().mana

        sendMessage(
            `/w ${playerName} ${Emote._Squid_} ${menuMessage}. ${playerMana}/${playerMaxMana} Mana. 
            | 0. Voltar ${habilitiesString}
            |`
        )
    }

    public static equipments(player: Player, menuMessage: string): void {

        const playerName = player.getName()
    
        sendMessage(
            `/w ${playerName} ${Emote._SirShield_} ${menuMessage}. 
            | 0. Voltar 
            | 1. Arma Corpo a Corpo 
            | 2. Arma Longo alcance 
            | 3. Capacetes 
            | 4. Armaduras 
            | 5. Luvas 
            | 6. Botas 
            | 7. Summário Geral 
            |`
        )
        return
    }

    public static equipmentMenu(player: Player, menuMessage: string): void {
	
        const playerName = player.getName()
    
        sendMessage(
            `/w ${playerName} ${Emote._SirShield_}  ${menuMessage} 
            | 0. Voltar
            | 1. Equipar
            | 2. Ver detalhes
            | 3. Desequipar
            |`
        )
    }

    public static equipmentInventory(player: Player, menuMessage: string): void {

        const equipmentype = player.getCurrentState().secondary.split(" ")[0]
        const playerName = player.getName()
    
        let equipments = ''

        switch(equipmentype) {
        
            case "longRangeWeapon": equipments = player.getAllEquipmentInventoryString("longRangeWeapon") ;break
            case "meleeWeapon":     equipments = player.getAllEquipmentInventoryString("meleeWeapon")     ;break
            case "helmet":          equipments = player.getAllEquipmentInventoryString("helmet")          ;break
            case "bodyArmor":       equipments = player.getAllEquipmentInventoryString("bodyArmor")       ;break
            case "gloves":          equipments = player.getAllEquipmentInventoryString("gloves")          ;break
            case "boots":           equipments = player.getAllEquipmentInventoryString("boots")           ;break
    
            default: throw Error(`ERROR: SendMessage_UI, "equipmentInventory": 
                Secondary state do not contain a equipment type included
            `)
        }

        sendMessage(
            `/w ${playerName} ${Emote._SirShield_} ${menuMessage}: 
            | 0. Voltar ${equipments}
            |`
        )
        return
    }
}
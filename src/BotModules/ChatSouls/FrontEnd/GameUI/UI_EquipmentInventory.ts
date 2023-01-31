import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_DataPayload, CS_EquipmentData, CS_EquipmentTypes } from "../../Globals/moduleTypes.js"
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_BOOTS_INVENTORY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_EquipmentInventory(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
	const player = data.playerInstance
    const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])

	if (commandWord === '!cs') {
        SendMessage_UI.equipmentInventory(player, `O que deseja equipar?`)
        return
	}

    let commandCode = Number(commandWord)
    switch (true) {

        case commandCode === 0: 
            Travel.to_EquipmentMenu(player, _UI.getReturnMessage(equipmentType))
            break
        //

        case (commandCode <= player.getEquipmentInventoryAmount(equipmentType)):

            const itemIndex = commandCode - 1

            _UI_Option.equipAndReturn(player, itemIndex)

            break
        //

        default:
            SendMessage_UI.equipmentInventory(player , `Código inválido. O que deseja equipar?`)
            break
        //
    }
}

class _UI_Option {

    public static equipAndReturn(player: Player, itemIndex: number): void {

        const playerState = player.getCurrentState()
        const equipmentType = return_CS_EquipmentTypes(playerState.secondary.split(" ")[0])
    
        player.equipFromInventory(itemIndex, equipmentType)
        player.calculateStats()
        player.recoverHP()
        player.save()
        player.setCurrentState({
            primary: playerState.primary,
            secondary: `${equipmentType} menu`
        })
    
        const equippedEquipment = player.getCurrentEquipment(equipmentType)
        
        SendMessage_UI.equipmentMenu(player, `
            ${_UI.returnEquippingMessage(equippedEquipment)}. 
            ${_UI.returnMenuEquipmentMessageByType(equipmentType)}
        `)
    }
}

class _UI {

    public static getReturnMessage(equipmentType: CS_EquipmentTypes): string {

        let message = undefined
    
        switch(equipmentType) {
    
            case "longRangeWeapon": message = `Você voltou ao menu de armas longo alcance` ;break
            case "meleeWeapon":     message = `Você voltou ao menu de armas corpo a corpo` ;break
            case "helmet":          message = `Você voltou ao menu de capacetes`           ;break
            case "bodyArmor":       message = `Você voltou ao menu de armaduras`           ;break
            case "gloves":          message = `Você voltou ao menu de luvas`               ;break
            case "boots":           message = `Você voltou ao menu de botas`               ;break
    
            default: throw Error(`ERROR: returnMenuMessageByType(): equipmentType not recognized`)
        }
    
        return message
    }

    public static returnMenuEquipmentMessageByType(equipmentType: CS_EquipmentTypes): string {

        let message = undefined
    
        switch(equipmentType) {
    
            case "longRangeWeapon": message = `Você voltou ao menu de armas longo alcance` ;break
            case "meleeWeapon":     message = `Você voltou ao menu de armas corpo a corpo` ;break
            case "helmet":          message = `Você voltou ao menu de capacetes`           ;break
            case "bodyArmor":       message = `Você voltou ao menu de armaduras`           ;break
            case "gloves":          message = `Você voltou ao menu de luvas`               ;break
            case "boots":           message = `Você voltou ao menu de botas`               ;break
    
            default: throw Error(`ERROR: returnMenuMessageByType(): equipmentType not recognized`)
        }
    
        return message
    }  

    public static returnEquippingMessage(equipmentObject: CS_EquipmentData): string {
        return `Você equipou ${equipmentObject.name}`
    }
}

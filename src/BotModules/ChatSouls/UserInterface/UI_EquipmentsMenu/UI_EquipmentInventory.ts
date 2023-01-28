import Player from "../../Classes/EntityChilds/Player.js"
import { sendMessage_UI_EquipmentInventory } from "../../FrontEnd/sendMessage/sendMessage_UI_EquipmentInventory.js"
import { CS_DataPayload } from "../../Types/moduleTypes.js"
import { return_CS_EquipmentTypes } from "../../Types/typesUtilsFunctions.js"
import equipAndReturnToEquipmentTypeMenu from "./equip.js"
import returnMenuEquipmentMessageByType from "./returnMenuEquipmentMessageByType.js"
import to_EquipmentMenu from "./to_EquipmentMenu.js"

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
        sendMessage_UI_EquipmentInventory(player, `O que deseja equipar?`)
        return
	}

    let commandCode = Number(commandWord)
    switch (true) {

        case commandCode === 0: 
            const menuMessage = returnMenuEquipmentMessageByType(equipmentType)
            to_EquipmentMenu(player, menuMessage)
            break
        //

        case (commandCode <= player.getEquipmentInventoryAmount(equipmentType)):
            
            const itemIndex = commandCode - 1
            equipAndReturnToEquipmentTypeMenu(player, itemIndex)
            break
        //

        default:
            sendMessage_UI_EquipmentInventory(player , `Código inválido. O que deseja equipar?`)
            break
        //
    }
}

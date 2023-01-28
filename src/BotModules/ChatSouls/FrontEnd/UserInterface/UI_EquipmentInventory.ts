import to_EquipmentMenu from "../../backEnd/sendTo/to_EquipmentMenu.js"
import Player from "../../Classes/EntityChilds/Player.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js"
import equipAndReturnToEquipmentTypeMenu from "../../UserInterface/UI_EquipmentsMenu/equip.js"
import returnMenuEquipmentMessageByType from "../buildMessages/returnMenuEquipmentMessageByType.js"
import { sendMessage_UI_EquipmentInventory } from "../sendMessage/sendMessage_UI_EquipmentInventory.js"

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

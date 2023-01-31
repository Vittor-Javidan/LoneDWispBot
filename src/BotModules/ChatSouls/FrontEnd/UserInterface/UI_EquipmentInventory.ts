import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js"
import equipAndReturnToEquipmentTypeMenu from "../../UserInterface/UI_EquipmentsMenu/equip.js"
import returnMenuEquipmentMessageByType from "../buildMessages/returnMenuEquipmentMessageByType.js"

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
            const menuMessage = returnMenuEquipmentMessageByType(equipmentType)
            Travel.to_EquipmentMenu(player, menuMessage)
            break
        //

        case (commandCode <= player.getEquipmentInventoryAmount(equipmentType)):
            
            const itemIndex = commandCode - 1
            equipAndReturnToEquipmentTypeMenu(player, itemIndex)
            break
        //

        default:
            SendMessage_UI.equipmentInventory(player , `Código inválido. O que deseja equipar?`)
            break
        //
    }
}

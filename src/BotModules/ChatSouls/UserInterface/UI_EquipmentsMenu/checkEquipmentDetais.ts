import Player from "../../Classes/EntityChilds/Player.js"
import { return_CS_EquipmentTypes } from "../../Types/typesUtilsFunctions.js"
import returnEquipmentDetails from "./returnEquipmentDetailByType.js"
import { sendMessage_UI_EquipmentMenu } from "./sendMessage_UI_EquipmentMenu.js"

export default function checkEquipmentDetais(player: Player): void {

    const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])
    const equippedEquipment = player.getCurrentEquipment(equipmentType)

    if(!equippedEquipment.name) {
        sendMessage_UI_EquipmentMenu(player,`você está sem capacete equipado`)
        return
    }

    const equipmentDetails = returnEquipmentDetails(equippedEquipment)
    sendMessage_UI_EquipmentMenu(player, equipmentDetails)
}

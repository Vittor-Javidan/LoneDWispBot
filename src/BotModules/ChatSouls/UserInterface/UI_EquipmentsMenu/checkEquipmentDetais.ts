import Player from "../../Classes/EntityChilds/Player.js"
import { sendMessage_UI_EquipmentMenu } from "../../FrontEnd/sendMessage/sendMessage_UI_EquipmentMenu.js"
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js"
import returnEquipmentDetails from "./returnEquipmentDetailByType.js"

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

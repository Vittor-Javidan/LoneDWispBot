import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import returnEquipmentDetails from "../../FrontEnd/buildMessages/returnEquipmentDetailByType.js"
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js"

export default function checkEquipmentDetais(player: Player): void {

    const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])
    const equippedEquipment = player.getCurrentEquipment(equipmentType)

    if(!equippedEquipment.name) {
        SendMessage_UI.equipmentMenu(player,`você está sem capacete equipado`)
        return
    }
    
    SendMessage_UI.equipmentMenu(player, returnEquipmentDetails(equippedEquipment))
}

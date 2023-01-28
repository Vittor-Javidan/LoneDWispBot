import Player from "../../Classes/EntityChilds/Player.js"
import returnEquippingMessage from "../../FrontEnd/buildMessages/returnEquippingMessage.js"
import returnMenuEquipmentMessageByType from "../../FrontEnd/buildMessages/returnMenuEquipmentMessageByType.js"
import { sendMessage_UI_EquipmentMenu } from "../../FrontEnd/sendMessage/sendMessage_UI_EquipmentMenu.js"
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js"

export default function equipAndReturnToEquipmentTypeMenu(player: Player, itemIndex: number): void {

    const playerState = player.getCurrentState()
    const equipmentType = return_CS_EquipmentTypes(playerState.secondary.split(" ")[0])

    player.setCurrentState({
        primary: playerState.primary,
        secondary: `${equipmentType} menu`
    })
    player.equipFromInventory(itemIndex, equipmentType)
    player.calculateStats()
    player.recoverHP()
    player.save()

    const equippedEquipment = player.getCurrentEquipment(equipmentType)
    sendMessage_UI_EquipmentMenu(player, 
        `${returnEquippingMessage(equippedEquipment)}. ${returnMenuEquipmentMessageByType(equipmentType)}`
    )
}

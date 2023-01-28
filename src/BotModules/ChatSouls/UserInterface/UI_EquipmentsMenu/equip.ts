import Player from "../../Classes/EntityChilds/Player.js"
import { return_CS_EquipmentTypes } from "../../Types/typesUtilsFunctions.js"
import returnEquippingMessage from "./returnEquippingMessage.js"
import returnMenuEquipmentMessageByType from "./returnMenuEquipmentMessageByType.js"
import { sendMessage_UI_EquipmentMenu } from "./sendMessage_UI_EquipmentMenu.js"

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

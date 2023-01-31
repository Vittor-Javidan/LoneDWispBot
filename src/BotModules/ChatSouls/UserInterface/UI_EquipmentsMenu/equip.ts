import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import returnEquippingMessage from "../../FrontEnd/buildMessages/returnEquippingMessage.js"
import returnMenuEquipmentMessageByType from "../../FrontEnd/buildMessages/returnMenuEquipmentMessageByType.js"
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
    
    SendMessage_UI.equipmentMenu(player, `
        ${returnEquippingMessage(equippedEquipment)}. 
        ${returnMenuEquipmentMessageByType(equipmentType)}
    `)
}

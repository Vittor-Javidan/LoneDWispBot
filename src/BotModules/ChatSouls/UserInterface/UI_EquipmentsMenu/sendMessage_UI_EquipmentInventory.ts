import sendMessage from "../../../../Twitch/sendMessageHandler.js";
import Player from "../../Classes/EntityChilds/Player.js";
import returnInventoryEquipmentCodes from "./returnInventoryEquipmentCodes.js";

export function sendMessage_UI_EquipmentInventory(player: Player, menuMessage: string): void {

    const equipmentCodes = returnInventoryEquipmentCodes(player)
    const playerName = player.getName()

    sendMessage(
        `/w @${playerName} ${menuMessage}: 
        | 0. Voltar ${equipmentCodes}
        |`
    )
    return
}

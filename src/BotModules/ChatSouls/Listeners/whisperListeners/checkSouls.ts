import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"

export default function checkSouls(player: Player): void {
    
    const playerName = player.getName()
    const souls = player.getSouls()
    sendMessage(`/w ${playerName} suas almas: ${souls}`)
}
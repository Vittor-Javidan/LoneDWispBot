import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"

export default function help(player: Player): void {
    
    const playerName = player.getName()
    sendMessage(`/w ${playerName} digite "!cs <commando>". Os commandos disponíveis são: help, souls`)
}
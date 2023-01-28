import Player from "../../Classes/EntityChilds/Player.js"
import { sendMessage_UI_Idle } from "./sendMessage_UI_Idle.js"

export default function to_Explore(player: Player, menuMessage: string): void {
    player.setCurrentState({
        primary: "EXPLORING",
        secondary: "IDLE"
    })
    sendMessage_UI_Idle(player, menuMessage)
}
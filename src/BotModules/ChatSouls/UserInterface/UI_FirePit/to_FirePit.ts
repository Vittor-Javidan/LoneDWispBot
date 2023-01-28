import Player from "../../Classes/EntityChilds/Player.js"
import { sendMessage_UI_FirePit } from "../../FrontEnd/sendMessage/sendMessage_UI_firePit.js"

export default function to_FirePit(player: Player, menuMessage: string): void {
    
    player.setCurrentState({
        primary: "FIRE_PIT",
        secondary: "RESTING_ON_FIRE_PIT"
    })

    player.recoverHP()

    sendMessage_UI_FirePit(player, menuMessage)
}
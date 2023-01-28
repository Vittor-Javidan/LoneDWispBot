import Player from "../../Classes/EntityChilds/Player.js";
import { sendMessage_UI_StatisticsMenu } from "./sendMessage_UI_StatisticsMenu.js";

export default function to_StatisticsMenu(player: Player, menuMessage: string) {
    
    player.setCurrentState({
        primary: "FIRE_PIT",
        secondary: "STATS_MENU"
    })
    sendMessage_UI_StatisticsMenu(player, menuMessage)
}
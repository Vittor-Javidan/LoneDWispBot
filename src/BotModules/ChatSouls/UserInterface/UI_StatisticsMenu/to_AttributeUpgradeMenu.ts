import Player from "../../Classes/EntityChilds/Player.js";
import { sendMessage_UI_AttributeUpgradeMenu } from "../../FrontEnd/sendMessage/sendMessage_UI_AttributeUpgradeMenu.js";

export default function to_AttributeUpgradeMenu(player: Player, menuMessage: string): void {

    player.setCurrentState({
        primary: "FIRE_PIT",
        secondary: "ATRIBUTE_UPGRADE"
    })
    
    sendMessage_UI_AttributeUpgradeMenu(player, menuMessage)
}
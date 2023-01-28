import Player from "../../Classes/EntityChilds/Player.js";
import { sendMessage_UI_Equipments } from "../../FrontEnd/sendMessage/sendMessage_UI_Equipments.js";

export default function to_Equipments(playerInstance: Player, menuMessage: string): void {

    const primaryState = playerInstance.getCurrentState().primary

    playerInstance.setCurrentState({
        primary: primaryState,
        secondary: "EQUIPMENT"
    })
    
    sendMessage_UI_Equipments(playerInstance, menuMessage)
}
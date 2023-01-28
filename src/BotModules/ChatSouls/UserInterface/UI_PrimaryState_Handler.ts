import Battle from "../Classes/Battle.js";
import { CS_DataPayload } from "../Types/moduleTypes.js";
import UI_Exploring_Handler from "./secondaryState_Handlers/UI_Exploring_Handler.js";
import UI_FirePit_Handler from "./secondaryState_Handlers/UI_FirePit_Handler.js";
import { sendMessage_UI_FirePit } from "./UI_FirePit/sendMessage_UI_firePit.js";

export default function gameUIHandler(data: CS_DataPayload): void {

    const primaryState = data.playerInstance.getCurrentState().primary

    try {
        
        switch (primaryState){
            case "FIRE_PIT":   UI_FirePit_Handler(data)     ;break
            case "EXPLORING":  UI_Exploring_Handler(data)   ;break
        }

    } catch (error) {
        
        const player = data.playerInstance
        
        player.ressurrect()
        player.recoverHP()
        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "RESTING_ON_FIRE_PIT"
        })
        Battle.deleteBattle(player.getName())
        
        sendMessage_UI_FirePit(
            player,
            `Ocorreu um erro no jogo e você foi mandado de volta a fogueira.`
        )
        console.log(error)
    }
}
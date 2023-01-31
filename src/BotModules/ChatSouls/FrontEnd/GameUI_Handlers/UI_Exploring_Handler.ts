import { CS_DataPayload } from "../../Globals/moduleTypes.js";
import UI_Battle from "../GameUI/UI_Battle.js";
import UI_Idle from "../GameUI/UI_Idle.js";

export default function UI_Exploring_Handler(data: CS_DataPayload): void {

    const states = data.playerInstance.getCurrentState()

    if(states.primary !== "EXPLORING") {
        throw Error(`ERROR: UI_Exploring_Handler. primary player state is not "EXPLORING"`)
    }
    
    switch(states.secondary) {

        case "IDLE": UI_Idle(data);break
        case "BATTLE": UI_Battle(data);break
    }
}
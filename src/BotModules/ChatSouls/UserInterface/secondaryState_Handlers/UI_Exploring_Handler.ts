import { CS_DataPayload } from "../../Types/moduleTypes.js";
import UI_Battle from "../UI_Battle/UI_Battle.js";
import UI_Idle from "../UI_Idle/UI_Idle.js";

export default function UI_Exploring_Handler(data: CS_DataPayload): void {

    const states = data.playerInstance.getCurrentState()

    if(states.primary !== "EXPLORING") {
        throw Error(`ERROR: UI_Exploring_Handler. primary player state is not "EXPLORING"`)
    }
    
    switch(states.secondary) {

        case "IDLE": UI_Idle(data);break
        case "HUNTING": UI_Battle(data, {
            fleeWeight: 1.25, 
            dodgeWeight: 0.5}
        );break
    }
}
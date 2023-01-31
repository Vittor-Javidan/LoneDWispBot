import SendMessage_UI from "../../Classes/SendMessage.js";
import Travel from "../../Classes/Travel.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";
import { explorationEvent } from "../Handlers/explorationEvent_Handler.js";

export default function UI_Idle(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance

    if (commandWord === '!cs') {
        SendMessage_UI.idle(playerInstance, `Você se está planejando seu próximo passo`)
		return
	}

    const commandCode = Number(commandWord)
    switch (commandCode) {

        case 0: Travel.to_FirePit(playerInstance, `Você montou uma fogueira`)  ;break
        case 1: explorationEvent(playerInstance)                               ;break
    }
}

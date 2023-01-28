import to_FirePit from "../../backEnd/sendTo/to_FirePit.js";
import { sendMessage_UI_Idle } from "../../FrontEnd/sendMessage/sendMessage_UI_Idle.js";
import { CS_DataPayload } from "../../Types/moduleTypes.js";
import { explorationEvent } from "../explorationEvent_Handler.js";

export default function UI_Idle(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance

    if (commandWord === '!cs') {
        sendMessage_UI_Idle(playerInstance, `Você se está planejando seu próximo passo`)
		return
	}

    const commandCode = Number(commandWord)
    switch (commandCode) {

        case 0: to_FirePit(playerInstance, `Você montou uma fogueira`)  ;break
        case 1: explorationEvent(playerInstance)                        ;break
    }
}

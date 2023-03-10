import Player from "../../Classes/EntityChilds/Player.js";
import SendMessage_UI from "../../Classes/SendMessage.js";
import Travel from "../../Classes/Travel.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";

export default function UI_Idle(data: CS_DataPayload): void {

    const commandWord: string = data.messageWords[0]
	const playerInstance: Player = data.playerInstance

    if (commandWord === '!cs') {
        SendMessage_UI.idle(playerInstance, `Você se está planejando seu próximo passo`)
		return
	}

    const commandCode: number = Number(commandWord)
    switch (commandCode) {

        case 0: Travel.to_FirePit(playerInstance, `Você montou uma fogueira`)  ;break
        case 1: _UI_Options.explorationEvent(playerInstance)                    ;break
    }
}

class _UI_Options {

    static explorationEvent(player: Player): void {

        Travel.to_NewBattle(player)
    }
}
import Battle from "../../Classes/Battle.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";
import sendMessage_UI_Battle from "../sendMessage/sendMessage_UI_Battle.js";

export default function UI_Battle(data: CS_DataPayload): void {
	
    const commandWord = data.message.split(" ")[0]
	const player = data.playerInstance
    const battle = Battle.getBattleByName(player.getName())

    if (commandWord === '!cs') {
        sendMessage_UI_Battle(battle, `Você está em batalha!!!`)
		return
	}

	const commandCode = Number(commandWord)
    
	switch (commandCode) {

		case 1: battle.attack() ;break

		default: sendMessage_UI_Battle(battle,`opção inválida`)	;break
	}
}
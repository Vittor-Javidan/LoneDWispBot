import Battle from "../../Classes/Battle.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";
import attack from "../scripts/attack.js";
import flee from "../scripts/flee.js";
import sendMessage_UI_Battle from "../sendMessage/sendMessage_UI_Battle.js";

export default function UI_Battle(data: CS_DataPayload, o: {
    fleeWeight: number,
    dodgeWeight: number
}): void {

    const {fleeWeight, dodgeWeight} = o
    const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance
    const battleInstance = Battle.getBattleByName(playerInstance.getName())

    if (commandWord === '!cs') {
        sendMessage_UI_Battle(battleInstance, `Você está em batalha!!!`)
		return
	}

	const commandCode = Number(commandWord)
    
	switch (commandCode) {

		case 0: flee(battleInstance, {
            fleeWeight: fleeWeight,
            dodgeWeight: dodgeWeight
        }); break

		case 1: attack(battleInstance, dodgeWeight)	;break

		default: sendMessage_UI_Battle(battleInstance,`opção inválida`)	;break
	}
}
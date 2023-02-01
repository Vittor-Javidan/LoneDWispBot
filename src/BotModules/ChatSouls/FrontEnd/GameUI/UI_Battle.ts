import Battle from "../../Classes/Battle.js";
import SendMessage_UI from "../../Classes/SendMessage.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";

export default function UI_Battle(data: CS_DataPayload): void {
	
    const commandWord = data.message.split(" ")[0]
	const player = data.playerInstance
    const battle = Battle.getBattleByName(player.getName())

    if (commandWord === '!cs') {
		
        SendMessage_UI.battle(battle, `Você está em batalha!!!`)
		return
	}

	const commandCode = Number(commandWord)
    
	switch (commandCode) {

		case 0: battle.flee()			 ;break
		case 1: battle.attackMelee() 	 ;break
		case 2: battle.attackLongRange() ;break

		default: SendMessage_UI.battle(battle,`opção inválida`)	;break
	}
}
import Battle from "../../Classes/Battle.js";
import Player from "../../Classes/EntityChilds/Player.js";
import SendMessage_UI from "../../Classes/SendMessage.js";
import Travel from "../../Classes/Travel.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";

export default function UI_Battle(data: CS_DataPayload): void {
	
    const commandWord: string = data.messageWords[0]
	const player: Player = data.playerInstance
    const battle: Battle = Battle.getBattleByName(player.getName())

    if (commandWord === '!cs') {
		
        SendMessage_UI.battle(battle, `Você está em batalha!!!`)
		return
	}

	const commandCode = Number(commandWord)
    
	switch (commandCode) {

		case 0: battle.playerAction("Flee")			 			;break
		case 1: battle.playerAction("Melee")					;break
		case 2: battle.playerAction("LongRange") 				;break
		case 3: Travel.to_HabilitiesUsageMenu(player) 				;break

		default: SendMessage_UI.battle(battle,`opção inválida`)	;break
	}
}
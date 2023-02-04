import Battle from "../../Classes/Battle.js";
import Player from "../../Classes/EntityChilds/Player.js";
import SendMessage_UI from "../../Classes/SendMessage.js";
import Travel from "../../Classes/Travel.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";

export default function UI_Battle_Habilities(data: CS_DataPayload): void {
	
    const commandWord = data.message.split(" ")[0]
	const player = data.playerInstance
	const battle = Battle.getBattleByName(player.getName())

    if (commandWord === '!cs') {
		
        SendMessage_UI.battle_habilities(player, `Você está em batalha olhando suas habilidades`)
		return
	}

	const commandCode = Number(commandWord)
    
	switch (true) {

		case commandCode === 0: Travel.to_CurrentBattle(player)             ;break
		
        case commandCode > 0 && commandCode <= player.getHabilitsAmount():
			useHabilitie(commandCode, player, battle)
			break
		//

		default: SendMessage_UI.battle_habilities(player, `opção inválida`)	;break
	}
}

function useHabilitie(commandCode: number, player: Player ,battle: Battle): void {
	
	const habilitieIndex = commandCode - 1
	const habilitieName = player.getHabilitiesNames()[habilitieIndex]
	battle.playerHabilitieUsageScenario(habilitieName)
	
	if(Battle.doesBattleExist(player.getName())) {
		player.setCurrentState({
			primary: "EXPLORING",
			secondary: "BATTLE"
		})
	}
}
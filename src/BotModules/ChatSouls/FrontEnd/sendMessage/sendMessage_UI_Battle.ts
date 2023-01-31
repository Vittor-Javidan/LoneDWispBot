import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Battle from "../../Classes/Battle.js"

export default function sendMessage_UI_Battle(battle: Battle, menuMessage: string): void {
    
    const player = battle.getPlayer()
    const playerName = player.getName()

	sendMessage(
		`/w ${playerName} ${menuMessage} ${battle.getBattleStatusString()}. 
        | 0. Fugir 
        | 1. Atacar 
        |`
	)
    return
}

import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Battle from "../../Classes/Battle.js"

export default function sendMessage_UI_Battle(battle: Battle, menuMessage: string): void {
    
    const playerInstance = battle.playerInstance
    const playerName = playerInstance.getName()

	sendMessage(
		`/w ${playerName} ${menuMessage} ${battle.getBattleStatus()}. 
        | 0. Fugir 
        | 1. Atacar 
        |`
	)
    return
}

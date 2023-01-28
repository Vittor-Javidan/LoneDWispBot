import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"

export function sendMessage_UI_Idle(playerInstance: Player, menuMessage: string): void {

    const playerName = playerInstance.getName()

	sendMessage(
		`/w ${playerName} ${menuMessage} 
        | 0. Voltar a fogueira
        | 1. Explorar 
        | 2. Procurar por recursos (Em progresso)
        | 3. Viajar (Em progresso)
        |`
	)
}

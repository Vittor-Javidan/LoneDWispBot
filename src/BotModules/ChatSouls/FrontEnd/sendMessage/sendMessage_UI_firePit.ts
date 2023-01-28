import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"

export function sendMessage_UI_FirePit(player: Player, menuMessage: string): void {

	const playerName = player.getName()

	sendMessage(
		`/w ${playerName} ${menuMessage} 
		| 0. Levantar da fogueira
		| 1. Statísticas 
		| 2. Ver Equipamento 
		|`
	)
}
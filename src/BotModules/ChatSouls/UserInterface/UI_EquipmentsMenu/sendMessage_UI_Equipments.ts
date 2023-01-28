import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"

export function sendMessage_UI_Equipments(player: Player, menuMessage: string): void {

	const playerName = player.getName()

	sendMessage(
		`/w ${playerName} ${menuMessage}. 
		| 0. Voltar 
		| 1. Arma Corpo a Corpo 
		| 2. Arma Longo alcance 
		| 3. Capacetes 
		| 4. Armaduras 
		| 5. Luvas 
		| 6. Botas 
		| 7. Summário Geral 
		|`
	)
    return
}

import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"

export function sendMessage_UI_StatisticsMenu(player: Player, menuMessage: string): void {

    const playerName = player.getName()

	sendMessage(
        `/w ${playerName} ${menuMessage} 
        | 0. Voltar 
        | 1. Ver Atributos 
        | 2. Upar Atributos 
        |`
	)
}

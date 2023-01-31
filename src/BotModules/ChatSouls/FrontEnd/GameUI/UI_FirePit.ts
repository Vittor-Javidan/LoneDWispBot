import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"

export default function UI_firePit(data: CS_DataPayload): void {

	const commandWord = data.message.split(" ")[0]
	const player = data.playerInstance

	if (commandWord === '!cs') {
		SendMessage_UI.firePit(player, `Você está na fogueira`);
		return
	}

	const commandCode = Number(commandWord)

	switch (commandCode) {

		case 0: Travel.to_Explore(player,				`Você se levanta da fogueira e olha em volta`);		;break
		case 1: Travel.to_StatisticsMenu(player, 		`Você está no menu de estatísticas`)   				;break
		case 2: Travel.to_Equipments(player,			`Você entrou no menu de equipamentos`)  			;break
		
		default: SendMessage_UI.firePit(player, 		`Código Inválido`)									;break
	}
}

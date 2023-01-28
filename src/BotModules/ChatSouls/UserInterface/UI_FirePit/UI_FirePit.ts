import { CS_DataPayload } from "../../Types/moduleTypes.js"
import to_Equipments from "../UI_EquipmentsMenu/to_Equipments.js"
import to_Explore from "../UI_Idle/to_Explore.js"
import to_StatisticsMenu from "../UI_StatisticsMenu/to_StatisticsMenu.js"
import { sendMessage_UI_FirePit } from "./sendMessage_UI_firePit.js"

export default function UI_firePit(data: CS_DataPayload): void {

	const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance

	if (commandWord === '!cs') {
		sendMessage_UI_FirePit(playerInstance, `Você está na fogueira`);
		return
	}

	const commandCode = Number(commandWord)

	switch (commandCode) {

		case 0: to_Explore(playerInstance,			`Você se levanta da fogueira e olha em volta`);		;break
		case 1: to_StatisticsMenu(playerInstance, 	`Você está no menu de estatísticas`)   				;break
		case 2: to_Equipments(playerInstance,		`Você entrou no menu de equipamentos`)  			;break
		
		default: sendMessage_UI_FirePit(playerInstance, `Código Inválido`)								;break
	}
}

import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"

export default function UI_HabilitieManagementMenu(data: CS_DataPayload): void {

	const commandWord: string = data.messageWords[0]
	const player: Player = data.playerInstance

	if (commandWord === '!cs') {
		SendMessage_UI.habilitieManagementMenu(player, `Você está no menu de gerenciamento de habilidades`);
		return
	}

	const commandCode: number = Number(commandWord)

	switch (commandCode) {

		case 0: Travel.to_FirePit(player,				  `Você voltou a fogueira`);	        ;break
		case 1: habilitieEquipMenu(player)														;break
		case 2: Travel.to_HabilitieUnequipMenu(player, 	  `Qual habilidade deseja desequipar?`) ;break
		
		default: SendMessage_UI.habilitieManagementMenu(player, 		  `Código Inválido`)	;break 
	}
}

function habilitieEquipMenu(player: Player): void {
	
	if(player.isInvetoryHabilitiesEmpty()) {	
		SendMessage_UI.habilitieManagementMenu(player, `
			Inventário de habilidades está vazio.
		`)
		return
	}
	
	Travel.to_HabilitieEquipMenu(player, 
		`Qual habilidade deseja equipar?`
	)
}

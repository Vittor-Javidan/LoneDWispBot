import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"

export default function UI_HabilitieUnequipMenu(data: CS_DataPayload): void {

	const commandWord: string = data.messageWords[0]
	const player: Player = data.playerInstance

	if (commandWord[0] === '!cs') {
		SendMessage_UI.habilitieUnequipMenu(player, `Você está no menu de gerenciamento de habilidades`);
		return
	}

	const slotCode = Number(commandWord)
	const MAX_SLOTS_AMOUNT = 6

	switch (true) {

		case slotCode === 0: Travel.to_HabilitieManagementMenu(player, 
            `Você voltou ao menu de gerenciamento de habilidade
        `); break
        
		case slotCode > 0 && slotCode <= MAX_SLOTS_AMOUNT: {
			
			const habilitieName: string = player.getCurrentHabilities()[slotCode].name

			if(habilitieName !== "Empty") {
				player.unequipHabilitie(slotCode)
				player.save()
				Travel.to_HabilitieManagementMenu(player, `
					${habilitieName} foi desequipado!
				`)
			} else {
				SendMessage_UI.habilitieUnequipMenu(player, `
					Você não pode desequipar um slot vazio!
				`)
			}
            break
		}
		
		default: SendMessage_UI.habilitieUnequipMenu(player, `
			Código Inválido.`
		)
	}
}

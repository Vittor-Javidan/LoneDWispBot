import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"

export default function UI_HabilitieEquipMenu(data: CS_DataPayload): void {

	const words: string[] = data.messageWords
	const commandWord: string = words[0]
	const player: Player = data.playerInstance

	if (commandWord[0] === '!cs') {
		SendMessage_UI.habilitieEquipMenu(player, `Você está no menu de gerenciamento de habilidades`);
		return
	}

	const itemCode = Number(commandWord)
	const slotCode = Number(words[1])
	const MAX_SLOTS_AMOUNT = 6

	switch (true) {

		case itemCode === 0: Travel.to_HabilitieManagementMenu(player, 
            `Você voltou ao menu de gerenciamento de habilidade
        `); break
        
		case (
			(itemCode > 0 && itemCode <= player.getHabilitiesInventoryAmount()) &&
			(slotCode > 0 && slotCode <= MAX_SLOTS_AMOUNT)
		): {
			const habilitieIndex = itemCode - 1 
            const habilitieName = player.getInventoryHabilitie(habilitieIndex).name
			
			player.equipHabilitieFromInventory(habilitieIndex, slotCode)
			player.save()
			
			Travel.to_HabilitieManagementMenu(player,`
				"${habilitieName}" equipado no slot ${slotCode}.
			`)
			
            break
		}
		
		default: SendMessage_UI.habilitieEquipMenu(player, `
			Código Inválido, por favor digite no formato <código item> <código slot>.`
		)
	}
}

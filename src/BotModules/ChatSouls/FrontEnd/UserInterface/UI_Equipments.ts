import { CS_DataPayload } from "../../Globals/moduleTypes.js"
import checkCurrentEquipments from "../../UserInterface/UI_EquipmentsMenu/checkCurrentEquipments.js"

import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"

export default function UI_Equipments(data: CS_DataPayload) {

	const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance

	if (commandWord === '!cs') {
		SendMessage_UI.equipments(data.playerInstance, `Você está no menu de quipamentos`)
        return
    }

	const commandCode = Number(commandWord)
	switch (commandCode) {

		case 0: Travel.to_FirePit(playerInstance,       `Você voltou para fogueira`)                ;break
        case 1: Travel.to_MeleeMenu(playerInstance,    	`Você está no menu de arma corpo a corpo`)	;break
        case 2: Travel.to_LongRangeMenu(playerInstance, `Você está no menu de armas longo alcance`) ;break
        case 3: Travel.to_HelmetMenu(playerInstance,    `Você está no menu de capacetes`)			;break
        case 4: Travel.to_BodyArmorMenu(playerInstance, `Você está no menu de armaduras`)			;break
        case 5: Travel.to_GlovesMenu(playerInstance,	`Você está no menu de luvas`)				;break
        case 6: Travel.to_BootsMenu(playerInstance,    	`Você está no menu de botas`)				;break
		case 7: checkCurrentEquipments(data,            `Você ainda está no menu de quipamentos`)   ;break

		default: SendMessage_UI.equipments(playerInstance, `Código inválido`)
	}
}
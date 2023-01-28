import { CS_DataPayload } from "../../Types/moduleTypes.js"
import to_FirePit from "../UI_FirePit/to_FirePit.js"
import checkCurrentEquipments from "./checkCurrentEquipments.js"
import { sendMessage_UI_Equipments } from "./sendMessage_UI_Equipments.js"

import {
    to_BodyArmorMenu,
    to_BootsMenu,
    to_GlovesMenu,
    to_HelmetMenu,
    to_LongRangeMenu,
    to_MeleeMenu
} from "./to_EquipmentMenu.js"

export default function UI_Equipments(data: CS_DataPayload) {

	const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance

	if (commandWord === '!cs') {
		sendMessage_UI_Equipments(data.playerInstance, `Você está no menu de quipamentos`)
        return
    }

	const commandCode = Number(commandWord)
	switch (commandCode) {

		case 0: to_FirePit(playerInstance,              `Você voltou para fogueira`)                ;break
        case 1: to_MeleeMenu(playerInstance,    		`Você está no menu de arma corpo a corpo`)	;break
        case 2: to_LongRangeMenu(playerInstance,    	`Você está no menu de armas longo alcance`) ;break
        case 3: to_HelmetMenu(playerInstance,    		`Você está no menu de capacetes`)			;break
        case 4: to_BodyArmorMenu(playerInstance,    	`Você está no menu de armaduras`)			;break
        case 5: to_GlovesMenu(playerInstance,			`Você está no menu de luvas`)				;break
        case 6: to_BootsMenu(playerInstance,    		`Você está no menu de botas`)				;break
		case 7: checkCurrentEquipments(data,            `Você ainda está no menu de quipamentos`)   ;break

		default: sendMessage_UI_Equipments(playerInstance, `Código inválido`)
	}
}
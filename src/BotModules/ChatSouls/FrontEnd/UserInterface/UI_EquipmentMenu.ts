import to_EquipmentInventory from "../../backEnd/sendTo/to_EquipmentInventory.js"
import to_Equipments from "../../backEnd/sendTo/to_Equipments.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"
import checkEquipmentDetais from "../../UserInterface/UI_EquipmentsMenu/checkEquipmentDetais.js"
import unequip from "../../UserInterface/UI_EquipmentsMenu/unequip.js"
import { sendMessage_UI_EquipmentMenu } from "../sendMessage/sendMessage_UI_EquipmentMenu.js"

export default function UI_EquipmentMenu(data: CS_DataPayload) {
   
    const words = data.message.split(" ")
	const playerInstance = data.playerInstance

	if (words[0] === '!cs') {
        sendMessage_UI_EquipmentMenu(playerInstance, 'Você está no menu de capacetes')
        return
    }

	let itemCode = Number(words[0])
	switch (itemCode) {

		case 0: 	to_Equipments(playerInstance, 				`Você voltou para o menu de equipamentos`)	;break
		case 1:		to_EquipmentInventory(playerInstance, 	    `Oque deseja equipar?`)						;break
		case 2: 	checkEquipmentDetais(playerInstance)														;break
		case 3: 	unequip(playerInstance)																		;break
		default:	sendMessage_UI_EquipmentMenu(playerInstance,`Código inválido`)							;break
	}
}
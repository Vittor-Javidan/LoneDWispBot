import Player from "../../Classes/EntityChilds/Player.js"
import BodyArmor from "../../Classes/Equipments/BodyArmor.js"
import Boots from "../../Classes/Equipments/Boots.js"
import Gloves from "../../Classes/Equipments/Gloves.js"
import Helmet from "../../Classes/Equipments/Helmet.js"
import LongRangeWeapon from "../../Classes/Equipments/LongRangeWeapon.js"
import MeleeWeapon from "../../Classes/Equipments/MeleeWeapon.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_DataPayload, CS_EquipmentData, CS_EquipmentTypes } from "../../Globals/moduleTypes.js"
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js"

export default function UI_EquipmentMenu(data: CS_DataPayload) {
   
    const words = data.message.split(" ")
	const player = data.playerInstance

	if (words[0] === '!cs') {
		
        SendMessage_UI.equipmentMenu(player, 'Você está no menu de capacetes')
        return
    }

	let itemCode = Number(words[0])
	switch (itemCode) {

		case 0: 	Travel.to_Equipments(player, 			`Você voltou para o menu de equipamentos`)	;break
		case 1:		Travel.to_EquipmentInventory(player,	`Oque deseja equipar?`)						;break
		case 2: 	_UI_Option.checkEquipmentDetais(player)												;break
		case 3: 	_UI_Option.unequip(player)															;break
		
		default:	SendMessage_UI.equipmentMenu(player,`Código inválido`)								;break
	}
}

class _UI_Option {

	public static checkEquipmentDetais(player: Player): void {
	
		const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])
		const equippedEquipment = player.getCurrentEquipment(equipmentType)
	
		if(!equippedEquipment.name) {
			SendMessage_UI.equipmentMenu(player,`você está sem capacete equipado`)
			return
		}
		
		SendMessage_UI.equipmentMenu(player, _UI.getEquipmentDetails(equippedEquipment))
	}

	public static unequip(player: Player): void {

		const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])
		const currentEquipment = player.getCurrentEquipment(equipmentType)
		const message = _UI.choseUnequipMessageByEquipmentType(equipmentType)
	
		if(currentEquipment.name === "Empty"){
			SendMessage_UI.equipmentMenu(player, message.noEquipment)
			return
		}
	
		player.unequip(equipmentType)
		player.calculateBaseStats()
		player.calculateStatsFromEquips()
		player.recoverHP()
		player.save()
		SendMessage_UI.equipmentMenu(player, 
			`${currentEquipment.name} ${message.withEquipment}`
		)
	}
}

class _UI {

	public static getEquipmentDetails(currentEquipment: CS_EquipmentData) {

		let detailsString = undefined
	
		switch(currentEquipment.type) {
			
			case "longRangeWeapon": detailsString = new LongRangeWeapon(currentEquipment).detailsString()   ;break
			case "meleeWeapon":     detailsString = new MeleeWeapon(currentEquipment).detailsString()       ;break
			case "helmet":          detailsString = new Helmet(currentEquipment).detailsString()            ;break
			case "bodyArmor":       detailsString = new BodyArmor(currentEquipment).detailsString()         ;break
			case "gloves":          detailsString = new Gloves(currentEquipment).detailsString()            ;break
			case "boots":           detailsString = new Boots(currentEquipment).detailsString()             ;break
	
			default: throw Error(`ERROR: returnEquipmentDetailByType(): equipmentType not recognized`)
		}
	
		return detailsString
	}

	public static choseUnequipMessageByEquipmentType(equipmentType: CS_EquipmentTypes): {
		noEquipment: string,
		withEquipment: string
	} {
	
		let message = undefined
		switch(equipmentType) {
	
			case "longRangeWeapon": message = {
				noEquipment: `você não possui nenhuma arma longo alcance equipada. Você ainda está no menu de arma longo alcance`,
				withEquipment: `desequipado. Você ainda está no menu de arma longo alcance`
			}; break
	
			case "meleeWeapon": message = {
				noEquipment: `você não possui nenhuma arma corpor a corpo equipada. Você ainda está no menu de arma corpo a corpo`,
				withEquipment: `desequipado. Você ainda está no menu de arma corpo a corpo`
			}; break
	
			case "helmet": message = {
				noEquipment: `você não possui nenhum capacete equipado. Você ainda está no menu de capacetes`,
				withEquipment: `desequipado. Você ainda está no menu de capacetes`
			}; break
	
			case "bodyArmor": message = {
				noEquipment: `você não possui nenhuma armadura equipada. Você ainda está no menu de armaduras`,
				withEquipment: `desequipado. Você ainda está no menu de armaduras`
			}; break
	
			case "gloves": message = {
				noEquipment: `você não possui nenhuma luva equipada. Você ainda está no menu de luvas`,
				withEquipment: `desequipado. Você ainda está no menu de luvas`
			}; break
	
			case "boots": message = {
				noEquipment: `você não possui nenhuma bota equipada. Você ainda está no menu de botas`,
				withEquipment: `desequipado. Você ainda está no menu de botas`
			}; break
	
			default: throw Error(`ERROR: choseMessageByEquipmentType(): equipment type not recognized`)
		}
	
		return message
	}
}
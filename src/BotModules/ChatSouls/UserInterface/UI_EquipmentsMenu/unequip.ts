import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import { CS_EquipmentTypes } from "../../Globals/moduleTypes.js"
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js"

export default function unequip(player: Player): void {

    const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])
    const currentEquipment = player.getCurrentEquipment(equipmentType)
    const message = choseUnequipMessageByEquipmentType(equipmentType)

	if(currentEquipment.name === "Empty"){
		SendMessage_UI.equipmentMenu(player, message.noEquipment)
		return
	}

	player.unequip(equipmentType)
	player.calculateStats()
    player.recoverHP()
	player.save()
	SendMessage_UI.equipmentMenu(player, 
        `${currentEquipment.name} ${message.withEquipment}`)
}

export function choseUnequipMessageByEquipmentType(equipmentType: CS_EquipmentTypes): {
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
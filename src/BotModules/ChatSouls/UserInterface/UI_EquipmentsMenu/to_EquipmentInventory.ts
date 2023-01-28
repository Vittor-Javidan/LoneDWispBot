import Player from "../../Classes/EntityChilds/Player.js"
import { sendMessage_UI_EquipmentInventory } from "../../FrontEnd/sendMessage/sendMessage_UI_EquipmentInventory.js"
import { sendMessage_UI_EquipmentMenu } from "../../FrontEnd/sendMessage/sendMessage_UI_EquipmentMenu.js"
import { return_CS_EquipmentTypes, return_CS_SecondaryStates_EQUIPMENT_INVENTORY } from "../../Types/typesUtilsFunctions.js"

export default function to_EquipmentInventory(player: Player, menuMessage: string): void {

    const primaryState = player.getCurrentState().primary    
    const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])

    if (player.isInventoryEquipmentsTypeEmpty(equipmentType)) {
		sendMessage_UI_EquipmentMenu(player, `Seu inventário está vazio.`)
		return
	}

    player.setCurrentState({
        primary: primaryState,
        secondary: return_CS_SecondaryStates_EQUIPMENT_INVENTORY(equipmentType)
    })
    
	sendMessage_UI_EquipmentInventory(
        player,
        menuMessage
	)
}


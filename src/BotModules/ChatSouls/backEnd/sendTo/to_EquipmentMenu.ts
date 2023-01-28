import Player from "../../Classes/EntityChilds/Player.js";
import { sendMessage_UI_EquipmentMenu } from "../../FrontEnd/sendMessage/sendMessage_UI_EquipmentMenu.js";
import { return_CS_EquipmentTypes } from "../../Globals/typesUtilsFunctions.js";

export default function to_EquipmentMenu(player: Player, menuMessage: string): void {

    const equipmentType = return_CS_EquipmentTypes(player.getCurrentState().secondary.split(" ")[0])

    player.setCurrentState({
        primary: player.getCurrentState().primary,
        secondary: `${equipmentType} menu`
    })

    sendMessage_UI_EquipmentMenu(player, menuMessage)
}

export function to_MeleeMenu(player: Player, menuMessage: string): void {

    player.setCurrentState({
        primary: player.getCurrentState().primary,
        secondary: "meleeWeapon menu"
    })
    sendMessage_UI_EquipmentMenu(player, menuMessage)
}

export function to_LongRangeMenu(player: Player, menuMessage: string): void {

    player.setCurrentState({
        primary: player.getCurrentState().primary,
        secondary: "longRangeWeapon menu"
    })
    sendMessage_UI_EquipmentMenu(player, menuMessage)
}

export function to_HelmetMenu(player: Player, menuMessage: string): void {

    player.setCurrentState({
        primary: player.getCurrentState().primary,
        secondary: "helmet menu"
    })
    sendMessage_UI_EquipmentMenu(player, menuMessage)
}

export function to_BodyArmorMenu(player: Player, menuMessage: string): void {

    player.setCurrentState({
        primary: player.getCurrentState().primary,
        secondary: "bodyArmor menu"
    })
    sendMessage_UI_EquipmentMenu(player, menuMessage)
}

export function to_GlovesMenu(player: Player, menuMessage: string) {

    player.setCurrentState({
        primary: player.getCurrentState().primary,
        secondary: "gloves menu"
    })
    sendMessage_UI_EquipmentMenu(player, menuMessage)
}

export function to_BootsMenu(player: Player, menuMessage: string): void {

    player.setCurrentState({
        primary: player.getCurrentState().primary,
        secondary: "boots menu"
    })
    sendMessage_UI_EquipmentMenu(player, menuMessage)
}

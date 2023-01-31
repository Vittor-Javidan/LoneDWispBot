import { CS_DataPayload } from "../../Globals/moduleTypes.js";
import UI_AttributeUpgradeMenu from "../GameUI/UI_AttributeUpgradeMenu.js";
import UI_EquipmentInventory from "../GameUI/UI_EquipmentInventory.js";
import UI_EquipmentMenu from "../GameUI/UI_EquipmentMenu.js";
import UI_Equipments from "../GameUI/UI_Equipments.js";
import UI_firePit from "../GameUI/UI_FirePit.js";
import UI_StatisticsMenu from "../GameUI/UI_StatisticsMenu.js";

export default function UI_FirePit_Handler(data: CS_DataPayload): void {

    const states = data.playerInstance.getCurrentState()

    if(states.primary !== "FIRE_PIT") {
        throw Error(`ERROR: UI_FirePit_Handler. primary player state is not "FIRE_PIT"`)
    }
    
    switch(states.secondary) {
        
        case "RESTING_ON_FIRE_PIT":         UI_firePit(data)                ;break

        case "STATS_MENU":                  UI_StatisticsMenu(data)         ;break
        case "ATRIBUTE_UPGRADE":            UI_AttributeUpgradeMenu(data)   ;break

        case "EQUIPMENT":                   UI_Equipments(data)             ;break
        case "longRangeWeapon menu":        UI_EquipmentMenu(data)          ;break
        case "meleeWeapon menu":            UI_EquipmentMenu(data)          ;break
        case "helmet menu":                 UI_EquipmentMenu(data)          ;break
        case "bodyArmor menu":              UI_EquipmentMenu(data)          ;break
        case "gloves menu":                 UI_EquipmentMenu(data)          ;break
        case "boots menu":                  UI_EquipmentMenu(data)          ;break
        case "longRangeWeapon inventory":   UI_EquipmentInventory(data)     ;break
        case "meleeWeapon inventory":       UI_EquipmentInventory(data)     ;break
        case "helmet inventory":            UI_EquipmentInventory(data)     ;break
        case "bodyArmor inventory":         UI_EquipmentInventory(data)     ;break
        case "gloves inventory":            UI_EquipmentInventory(data)     ;break
        case "boots inventory":             UI_EquipmentInventory(data)     ;break
    }
}
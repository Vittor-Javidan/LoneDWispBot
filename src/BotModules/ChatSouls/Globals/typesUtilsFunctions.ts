import { CS_EquipmentTypes, CS_SecondaryStates_EQUIPMENT_INVENTORY, CS_SecondaryState_EQUIPMENTS_MENU } from "./moduleTypes.js"

export function return_CS_EquipmentTypes(equipmentTypeString: string): CS_EquipmentTypes {

    switch(equipmentTypeString) {
        
        case "longRangeWeapon": return "longRangeWeapon"
        case "meleeWeapon":     return "meleeWeapon"
        case "helmet":          return "helmet"
        case "bodyArmor":       return "bodyArmor"
        case "gloves":          return "gloves"
        case "boots":           return "boots"

        default: throw Error(`ERROR: "convertStringToEquipmentType"
            The given string corresponds to no valid "CS_EquipmentTypes" type
        `)
    }
}

export function return_CS_SecondaryState_EQUIPMENTS_MENU(equipmentTypeString: string): CS_SecondaryState_EQUIPMENTS_MENU {

    switch(equipmentTypeString) {

        case "longRangeWeapon": return "longRangeWeapon menu"
        case "meleeWeapon":     return "meleeWeapon menu"
        case "helmet":          return "helmet menu"
        case "bodyArmor":       return "bodyArmor menu"
        case "gloves":          return "gloves menu"
        case "boots":           return "boots menu"

        default: throw Error(`ERROR: "convertStringToEquipmentType"
            The given string corresponds to no valid "CS_EquipmentTypes" type
        `)
    }
}

export function return_CS_SecondaryStates_EQUIPMENT_INVENTORY(equipmentTypeString: string): CS_SecondaryStates_EQUIPMENT_INVENTORY {

    switch(equipmentTypeString) {

        case "longRangeWeapon": return "longRangeWeapon inventory"
        case "meleeWeapon":     return "meleeWeapon inventory"
        case "helmet":          return "helmet inventory"
        case "bodyArmor":       return "bodyArmor inventory"
        case "gloves":          return "gloves inventory"
        case "boots":           return "boots inventory"

        default: throw Error(`ERROR: "convertStringToEquipmentType"
            The given string corresponds to no valid "CS_EquipmentTypes" type
        `)
    }
}
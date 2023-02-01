import {
    CS_BodyArmorData,
    CS_BootsData,
    CS_Catalog_BodyArmor,
    CS_Catalog_Boots,
    CS_Catalog_Gloves,
    CS_Catalog_Helmet,
    CS_Catalog_LongRange,
    CS_Catalog_Melee,
    CS_DataBase_BodyArmor,
    CS_DataBase_Boots, CS_DataBase_Gloves,
    CS_DataBase_Helmet,
    CS_DataBase_LongRange,
    CS_DataBase_MeleeWeapon,
    CS_GlovesData,
    CS_HelmetData,
    CS_LongRangeData,
    CS_MeleeData
} from '../../Globals/moduleTypes.js'

import { bodyArmorDatabase } from './equipmentsData/bodyArmorData.js'
import { bootsDatabase } from './equipmentsData/bootsData.js'
import { glovesDatabase } from './equipmentsData/glovesData.js'
import { helmetDatabase } from './equipmentsData/helmetData.js'
import { longRangeDatabase } from './equipmentsData/longRangeData.js'
import { meleeDatabase } from './equipmentsData/meleeData.js'

export function getAll_LongRange(): CS_DataBase_LongRange {
    return structuredClone(longRangeDatabase)
}

export function getAll_Melee(): CS_DataBase_MeleeWeapon {
    return structuredClone(meleeDatabase)
}

export function getAll_Helmet(): CS_DataBase_Helmet {
    return structuredClone(helmetDatabase)
}

export function getAll_BodyArmor(): CS_DataBase_BodyArmor {
    return structuredClone(bodyArmorDatabase)
}

export function getAll_Gloves(): CS_DataBase_Gloves {
    return structuredClone(glovesDatabase)
}

export function getAll_Boots(): CS_DataBase_Boots {
    return structuredClone(bootsDatabase)
}

export function getLongRange(itemName: CS_Catalog_LongRange): CS_LongRangeData {
    return structuredClone(longRangeDatabase[itemName])
}

export function getMelee(itemName: CS_Catalog_Melee): CS_MeleeData {
    return structuredClone(meleeDatabase[itemName])
}

export function getHelmet(itemName: CS_Catalog_Helmet): CS_HelmetData {
    return structuredClone(helmetDatabase[itemName])
}

export function getBodyArmor(itemName: CS_Catalog_BodyArmor): CS_BodyArmorData {
    return structuredClone(bodyArmorDatabase[itemName])
}

export function getGloves(itemName: CS_Catalog_Gloves): CS_GlovesData {
    return structuredClone(glovesDatabase[itemName])
}

export function getBoots(itemName: CS_Catalog_Boots): CS_BootsData {
    return structuredClone(bootsDatabase[itemName])
}
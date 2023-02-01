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
    CS_DataBase_Boots,
    CS_DataBase_Equipments,
    CS_DataBase_Gloves,
    CS_DataBase_Helmet,
    CS_DataBase_LongRange,
    CS_DataBase_MeleeWeapon,
    CS_GlovesData,
    CS_HelmetData,
    CS_LongRangeData,
    CS_MeleeData
} from '../../Globals/moduleTypes.js'
import { allBodyArmorData } from './equipmentsData/bodyArmorData.js'
import { allBootsData } from './equipmentsData/bootsData.js'
import { allGlovesData } from './equipmentsData/glovesData.js'
import { allHelmetData } from './equipmentsData/helmetData.js'

import { allLongRangeData } from './equipmentsData/longRangeData.js'
import { allMeleeData } from './equipmentsData/meleeData.js'

export const equipmentDataBase: CS_DataBase_Equipments = {

    longRangeWeapon: allLongRangeData,
    meleeWeapon:     allMeleeData,
    helmet:          allHelmetData,
    bodyArmor:       allBodyArmorData,
    gloves:          allGlovesData,
    boots:           allBootsData
}

export function getAll_LongRange(): CS_DataBase_LongRange {
    return structuredClone(equipmentDataBase["longRangeWeapon"])
}

export function getAll_Melee(): CS_DataBase_MeleeWeapon {
    return structuredClone(equipmentDataBase["meleeWeapon"])
}

export function getAll_Helmet(): CS_DataBase_Helmet {
    return structuredClone(equipmentDataBase["helmet"])
}

export function getAll_BodyArmor(): CS_DataBase_BodyArmor {
    return structuredClone(equipmentDataBase["bodyArmor"])
}

export function getAll_Gloves(): CS_DataBase_Gloves {
    return structuredClone(equipmentDataBase["gloves"])
}

export function getAll_Boots(): CS_DataBase_Boots {
    return structuredClone(equipmentDataBase["boots"])
}

export function getLongRange(itemName: CS_Catalog_LongRange): CS_LongRangeData {
    return structuredClone(equipmentDataBase["longRangeWeapon"][itemName])
}

export function getMelee(itemName: CS_Catalog_Melee): CS_MeleeData {
    return structuredClone(equipmentDataBase["meleeWeapon"][itemName])
}

export function getHelmet(itemName: CS_Catalog_Helmet): CS_HelmetData {
    return structuredClone(equipmentDataBase["helmet"][itemName])
}

export function getBodyArmor(itemName: CS_Catalog_BodyArmor): CS_BodyArmorData {
    return structuredClone(equipmentDataBase["bodyArmor"][itemName])
}

export function getGloves(itemName: CS_Catalog_Gloves): CS_GlovesData {
    return structuredClone(equipmentDataBase["gloves"][itemName])
}

export function getBoots(itemName: CS_Catalog_Boots): CS_BootsData {
    return structuredClone(equipmentDataBase["boots"][itemName])
}
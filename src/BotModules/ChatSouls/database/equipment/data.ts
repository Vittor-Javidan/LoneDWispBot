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

export const equipmentDataBase: CS_DataBase_Equipments = {

    longRangeWeapon: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            type: 'longRangeWeapon'
        },
        "Empty": {
            name: "Empty",
            type: 'longRangeWeapon'
        },
        "Arco de madeira": {
            name: "Arco de madeira",
            type: 'longRangeWeapon'
        }
    },

    meleeWeapon: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            type: 'meleeWeapon'
        },
        "Empty": {
            name: "Empty",
            type: 'meleeWeapon'
        },
        "Adaga": {
            name: "Adaga",
            type: 'meleeWeapon'
        },
        "Espada enferrujada": {
            name: "Espada enferrujada",
            type: 'meleeWeapon'
        }
    },

    helmet: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            type: 'helmet'
        },
        "Empty": {
            name: "Empty",
            type: 'helmet'
        },
        "Chapéu de caçador": {
            name: "Chapéu de caçador",
            type: 'helmet'
        },
        "Elmo enferrujado": {
            name: "Elmo enferrujado",
            type: "helmet"
        }
    },

    bodyArmor: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            type: 'bodyArmor'
        },
        "Empty": {
            name: "Empty",
            type: 'bodyArmor'
        },
        "Roupa de caçador": {
            name: "Roupa de caçador",
            type: "bodyArmor"
        },
        "Armadura enferrujada": {
            name: "Armadura enferrujada",
            type: 'bodyArmor'
        }
    },

    gloves: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            type: 'gloves'
        },
        "Empty": {
            name: "Empty",
            type: 'gloves'
        },
        "Luvas de caçador": {
            name: "Luvas de caçador",
            type: 'gloves'
        },
        "Luvas enferrujadas": {
            name: "Luvas enferrujadas",
            type: 'gloves'
        }
    },

    boots: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            type: 'boots'
        },
        "Empty": {
            name: "Empty",
            type: 'boots'
        },
        "Botas de caçador": {
            name: "Botas de caçador",
            type: 'boots'
        },
        "Botas enferrujadas": {
            name: "Botas enferrujadas",
            type: 'boots'
        }
    }
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
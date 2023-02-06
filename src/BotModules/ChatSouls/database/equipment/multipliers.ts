import {
    CS_Armor_Multipliers, CS_Catalog_BodyArmor,
    CS_Catalog_Boots,
    CS_Catalog_Gloves,
    CS_Catalog_Helmet,
    CS_Catalog_LongRange,
    CS_Catalog_Melee,
    CS_Weapon_Multipliers
} from "../../Globals/moduleTypes.js";

export const equipments_Multipliers: {
    longRangeWeapon: Record<CS_Catalog_LongRange, CS_Weapon_Multipliers>,
    meleeWeapon: Record<CS_Catalog_Melee, CS_Weapon_Multipliers>,
    helmet: Record<CS_Catalog_Helmet, CS_Armor_Multipliers>,
    bodyArmor: Record<CS_Catalog_BodyArmor, CS_Armor_Multipliers>,
    gloves: Record<CS_Catalog_Gloves, CS_Armor_Multipliers>,
    boots: Record<CS_Catalog_Boots, CS_Armor_Multipliers>
} = {

    longRangeWeapon: {
        "Dummy Equipment": getDummyEquipmentWeaponMultipliers(),
        "Empty": getEmptyEquipmentWeaponMultipliers(),
        "Arco de madeira": {
            agility:        20,
            strenght:       0,
            fireDamage:     0,
            iceDamage:      0,
            thunderDamage:  0,
            poisonDamage:   0
        },
        "Cuspida tóxica": {
            agility:        0,
            strenght:       0,
            fireDamage:     0,
            iceDamage:      0,
            thunderDamage:  0,
            poisonDamage:   20
        }
    },

    meleeWeapon: {
        "Dummy Equipment": getDummyEquipmentWeaponMultipliers(),
        "Empty": getEmptyEquipmentWeaponMultipliers(),
        "Adaga": {
            agility:        14,
            strenght:       6,
            fireDamage:     0,
            iceDamage:      0,
            thunderDamage:  0,
            poisonDamage:   0
        },
        "Espada enferrujada": {
            agility:        0,
            strenght:       20,
            fireDamage:     0,
            iceDamage:      0,
            thunderDamage:  0,
            poisonDamage:   0
        },
        "Garras de Javali": {
            agility:        0,
            strenght:       20,
            fireDamage:     0,
            iceDamage:      0,
            thunderDamage:  0,
            poisonDamage:   0
        }
    },

    helmet: {
        "Dummy Equipment": getDummyEquipmentArmorMultipliers(),
        "Empty": getEmptyEquipmentArmorMultipliers(),
        "Chapéu de caçador": {
            vitality:       4,
            agility:        3,
            strenght:       3,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        },
        "Elmo enferrujado": {
            vitality:       4,
            agility:        0,
            strenght:       6,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        },
        "Crânio endurecido": {
            vitality:       5,
            agility:        0,
            strenght:       5,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        }
    },

    bodyArmor: {
        "Dummy Equipment": getDummyEquipmentArmorMultipliers(),
        "Empty": getEmptyEquipmentArmorMultipliers(),
        "Roupa de caçador": {
            vitality:       4,
            agility:        3,
            strenght:       3,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        },
        "Armadura enferrujada": {
            vitality:       4,
            agility:        0,
            strenght:       6,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        },
        "Pele de Javali": {
            vitality:       4,
            agility:        3,
            strenght:       6,
            mana:           0,
            fireDefense:    -3,
            iceDefense:     -3,
            thunderDefense: -3,
            poisonDefense:  -3
        }
    },

    gloves: {
        "Dummy Equipment": getDummyEquipmentArmorMultipliers(),
        "Empty": getEmptyEquipmentArmorMultipliers(),
        "Luvas de caçador": {
            vitality:       4,
            agility:        3,
            strenght:       3,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        },
        "Luvas enferrujadas": {
            vitality:       4,
            agility:        0,
            strenght:       6,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        },
        "Patas de javali": {
            vitality:       3,
            agility:        5,
            strenght:       3,
            mana:           0,
            fireDefense:    -1,
            iceDefense:     -1,
            thunderDefense: -1,
            poisonDefense:  -1
        }
    },

    boots: {
        "Dummy Equipment": getDummyEquipmentArmorMultipliers(),
        "Empty": getEmptyEquipmentArmorMultipliers(),
        "Botas de caçador": {
            vitality:       4,
            agility:        3,
            strenght:       3,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        },
        "Botas enferrujadas": {
            vitality:       4,
            agility:        0,
            strenght:       6,
            mana:           0,
            fireDefense:    0,
            iceDefense:     0,
            thunderDefense: 0,
            poisonDefense:  0
        },
        "Patas de javali": {
            vitality:       3,
            agility:        5,
            strenght:       3,
            mana:           0,
            fireDefense:    -1,
            iceDefense:     -1,
            thunderDefense: -1,
            poisonDefense:  -1
        }
    }
}

export function getLongRange_Multipliers(itemName: CS_Catalog_LongRange): CS_Weapon_Multipliers {
    return structuredClone(equipments_Multipliers["longRangeWeapon"][itemName])
}

export function getMelee_Multipliers(itemName: CS_Catalog_Melee): CS_Weapon_Multipliers {
    return structuredClone(equipments_Multipliers["meleeWeapon"][itemName])
}

export function getHelmet_Multipliers(itemName: CS_Catalog_Helmet): CS_Armor_Multipliers {
    return structuredClone(equipments_Multipliers["helmet"][itemName])
}

export function getBodyArmor_Multipliers(itemName: CS_Catalog_BodyArmor): CS_Armor_Multipliers {
    return structuredClone(equipments_Multipliers["bodyArmor"][itemName])
}

export function getGloves_Multipliers(itemName: CS_Catalog_Gloves): CS_Armor_Multipliers {
    return structuredClone(equipments_Multipliers["gloves"][itemName])
}

export function getBoots_Multipliers(itemName: CS_Catalog_Boots): CS_Armor_Multipliers {
    return structuredClone(equipments_Multipliers["boots"][itemName])
}


function getDummyEquipmentWeaponMultipliers(): CS_Weapon_Multipliers {
    return {
        agility:        100,
        strenght:       100,
        fireDamage:     100,
        iceDamage:      100,
        thunderDamage:  100,
        poisonDamage:   100
    }
}

function getEmptyEquipmentWeaponMultipliers(): CS_Weapon_Multipliers {
    return {
        agility:        0,
        strenght:       0,
        fireDamage:     0,
        iceDamage:      0,
        thunderDamage:  0,
        poisonDamage:   0
    }
}

function getDummyEquipmentArmorMultipliers(): CS_Armor_Multipliers {
    return {
        vitality:       100,
        agility:        100,
        strenght:       100,
        mana:   100,
        fireDefense:    100,
        iceDefense:     100,
        thunderDefense: 100,
        poisonDefense:  100
    }
} 

function getEmptyEquipmentArmorMultipliers(): CS_Armor_Multipliers {
    return {
        vitality:       0,
        agility:        0,
        strenght:       0,
        mana:   0,
        fireDefense:    0,
        iceDefense:     0,
        thunderDefense: 0,
        poisonDefense:  0
    }
}

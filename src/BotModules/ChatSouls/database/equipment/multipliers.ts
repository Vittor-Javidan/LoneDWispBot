import {
    CS_Attributes,
    CS_Catalog_BodyArmor,
    CS_Catalog_Boots,
    CS_Catalog_Gloves,
    CS_Catalog_Helmet,
    CS_Catalog_LongRange,
    CS_Catalog_Melee
} from "../../Globals/moduleTypes.js";

export const equipments_Multipliers: {
    longRangeWeapon: Record<CS_Catalog_LongRange, CS_Attributes>,
    meleeWeapon: Record<CS_Catalog_Melee, CS_Attributes>,
    helmet: Record<CS_Catalog_Helmet, CS_Attributes>,
    bodyArmor: Record<CS_Catalog_BodyArmor, CS_Attributes>,
    gloves: Record<CS_Catalog_Gloves, CS_Attributes>,
    boots: Record<CS_Catalog_Boots, CS_Attributes>
} = {

    longRangeWeapon: {
        "Dummy Equipment": {
            vitality: 100,
            agility: 100,
            strenght: 100,
            intelligence: 100,
        },
        "Empty": {
            vitality: 0,
            agility: 0,
            strenght: 0,
            intelligence: 0,
        },
        "Arco de madeira": {
            vitality: 0,
            agility: 0,
            strenght: 0.2,
            intelligence: 0,
        }
    },

    meleeWeapon: {
        "Dummy Equipment": {
            vitality: 100,
            agility: 100,
            strenght: 100,
            intelligence: 100,
        },
        "Empty": {
            vitality: 0,
            agility: 0,
            strenght: 0,
            intelligence: 0,
        },
        "Adaga": {
            vitality: 0,
            agility: 0,
            strenght: 0.2,
            intelligence: 0
        },
        "Espada enferrujada": {
            vitality: 0,
            agility: 0,
            strenght: 0.3,
            intelligence: 0
        }
    },

    helmet: {
        "Dummy Equipment": {
            vitality: 100,
            agility: 100,
            strenght: 100,
            intelligence: 100,
        },
        "Empty": {
            vitality: 0,
            agility: 0,
            strenght: 0,
            intelligence: 0,
        },
        "Chapéu de caçador": {
            vitality: 0.1,
            agility: 0,
            strenght: 0.1,
            intelligence: 0,
        },
        "Elmo enferrujado": {
            vitality: 0.1,
            agility: 0,
            strenght: 0.1,
            intelligence: 0
        }
    },

    bodyArmor: {
        "Dummy Equipment": {
            vitality: 100,
            agility: 100,
            strenght: 100,
            intelligence: 100,
        },
        "Empty": {
            vitality: 0,
            agility: 0,
            strenght: 0,
            intelligence: 0,
        },
        "Roupa de caçador": {
            vitality: 0.1,
            agility: 0,
            strenght: 0.1,
            intelligence: 0,
        },
        "Armadura enferrujada": {
            vitality: 0.1,
            agility: 0,
            strenght: 0.1,
            intelligence: 0
        }
    },

    gloves: {
        "Dummy Equipment": {
            vitality: 100,
            agility: 100,
            strenght: 100,
            intelligence: 100,
        },
        "Empty": {
            vitality: 0,
            agility: 0,
            strenght: 0,
            intelligence: 0,
        },
        "Luvas de caçador": {
            vitality: 0.1,
            agility: 0,
            strenght: 0.1,
            intelligence: 0,
        },
        "Luvas enferrujadas": {
            vitality: 0.1,
            agility: 0,
            strenght: 0.1,
            intelligence: 0
        }
    },

    boots: {
        "Dummy Equipment": {
            vitality: 100,
            agility: 100,
            strenght: 100,
            intelligence: 100,
        },
        "Empty": {
            vitality: 0,
            agility: 0,
            strenght: 0,
            intelligence: 0,
        },
        "Botas de caçador": {
            vitality: 0.0,
            agility: 0.2,
            strenght: 0.0,
            intelligence: 0,
        },
        "Botas enferrujadas": {
            vitality: 0.1,
            agility: 0,
            strenght: 0.1,
            intelligence: 0
        }
    }
}

export function getLongRange_Multipliers(itemName: CS_Catalog_LongRange): CS_Attributes {
    return structuredClone(equipments_Multipliers["longRangeWeapon"][itemName])
}

export function getMelee_Multipliers(itemName: CS_Catalog_Melee): CS_Attributes {
    return structuredClone(equipments_Multipliers["meleeWeapon"][itemName])
}

export function getHelmet_Multipliers(itemName: CS_Catalog_Helmet): CS_Attributes {
    return structuredClone(equipments_Multipliers["helmet"][itemName])
}

export function getBodyArmor_Multipliers(itemName: CS_Catalog_BodyArmor): CS_Attributes {
    return structuredClone(equipments_Multipliers["bodyArmor"][itemName])
}

export function getGloves_Multipliers(itemName: CS_Catalog_Gloves): CS_Attributes {
    return structuredClone(equipments_Multipliers["gloves"][itemName])
}

export function getBoots_Multipliers(itemName: CS_Catalog_Boots): CS_Attributes {
    return structuredClone(equipments_Multipliers["boots"][itemName])
}
import { CS_Catalog_BodyArmor, CS_Catalog_Boots, CS_Catalog_Gloves, CS_Catalog_Helmet, CS_Catalog_LongRange, CS_Catalog_Melee, CS_EquipmentTypes } from "../../Types/moduleTypes.js";

export const equipments_Description: Record<CS_EquipmentTypes, Record<string, string>> | {
    longRangeWeapon: Record<CS_Catalog_LongRange, string>,
    meleeWeapon: Record<CS_Catalog_Melee, string>,
    helmet: Record<CS_Catalog_Helmet, string>,
    bodyArmor: Record<CS_Catalog_BodyArmor, string>
    gloves: Record<CS_Catalog_Gloves, string>,
    boots: Record<CS_Catalog_Boots, string>
} = {

    longRangeWeapon: {
        "Dummy Equipment": "Dummy Equipment. Used for code testing purpose",
        "Empty": "Empty",
        "Arco de madeira": "Um arco simples de madeira.",
    },

    meleeWeapon: {
        "Dummy Equipment": "Dummy Equipment. Used for code testing purpose",
        "Empty": "Empty",
        "Adaga": "Uma adaga comum. Tão especial quanto uma pedra na estrada.",
        "Espada enferrujada": "Se a lâmina cega não matar, o têtano irá!"
    },

    helmet: {
        "Dummy Equipment": "Dummy Equipment. Used for code testing purpose",
        "Empty": "Empty",
        "Chapéu de caçador": "Chapéu de caçador. Usado para se camuflar na floresta.",
        "Elmo enferrujado": "Elmo muito pesado e sem qualidade."
    },

    bodyArmor: {
        "Dummy Equipment": "Dummy Equipment. Used for code testing purpose",
        "Empty": "Empty",
        "Roupa de caçador": "Roupa de caçador. Usado para se camuflar na floresta.",
        "Armadura enferrujada": "Armadura muito pesada e sem qualidade",
    },

    gloves: {
        "Dummy Equipment": "Dummy Equipment. Used for code testing purpose",
        "Empty": "Empty",
        "Luvas de caçador": "Luvas de caçador. Usado para se camuflar na floresta.",
        "Luvas enferrujadas": "Luvas Rígidas e sem qualidade."
    },

    boots: {
        "Dummy Equipment": "Dummy Equipment. Used for code testing purpose",
        "Empty": "Empty",
        "Botas de caçador": "Botas de caçador. Usado para se camuflar na floresta.",
        "Botas enferrujadas": "Botas rígidas e sem conforto"
    }
}

export function getLongRange_Description(itemName: CS_Catalog_LongRange): string {
    return equipments_Description["longRangeWeapon"][itemName]
}

export function getMelee_Description(itemName: CS_Catalog_Melee): string {
    return equipments_Description["meleeWeapon"][itemName]
}

export function getHelmet_Description(itemName: CS_Catalog_Helmet): string {
    return equipments_Description["helmet"][itemName]
}

export function getBodyArmor_Description(itemName: CS_Catalog_BodyArmor): string {
    return equipments_Description["bodyArmor"][itemName]
}

export function getGloves_Description(itemName: CS_Catalog_Gloves): string {
    return equipments_Description["gloves"][itemName]
}

export function getBoots_Description(itemName: CS_Catalog_Boots): string {
    return equipments_Description["boots"][itemName]
}
export const GENERIC_EQUIPMENTS_ARRAY = [
    "Empty",
    "Dummy Equipment"
] as const

export const EQUIPMENT_TYPES_ARRAY = [
    "longRangeWeapon", 
    "meleeWeapon", 
    "helmet", 
    "bodyArmor", 
    "gloves", 
    "boots"
] as const

export const LONG_RANGE_ARRAY = [
    ...GENERIC_EQUIPMENTS_ARRAY,
    "Arco de madeira",
    "Cuspida tóxica"
] as const

export const MELEE_ARRAY = [
    ...GENERIC_EQUIPMENTS_ARRAY,
    "Adaga",
    "Espada enferrujada",
    "Garras de Javali"
] as const

export const HELMET_ARRAY = [
    ...GENERIC_EQUIPMENTS_ARRAY,
    "Chapéu de caçador",
    "Elmo enferrujado",
    "Crânio endurecido"
] as const

export const BODY_ARMOR_ARRAY = [
    ...GENERIC_EQUIPMENTS_ARRAY,
    "Roupa de caçador",
    "Armadura enferrujada",
    "Pele de Javali"
] as const

export const GLOVES_ARRAY = [
    ...GENERIC_EQUIPMENTS_ARRAY,
    "Luvas de caçador",
    "Luvas enferrujadas",
    "Patas de javali"
] as const

export const BOOTS_ARRAY = [
    ...GENERIC_EQUIPMENTS_ARRAY,
    "Botas de caçador",
    "Botas enferrujadas",
    "Patas de javali"
] as const
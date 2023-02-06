export const GENERIC_HABILITIES_ARRAY = [
    "Empty",
    "Dummy Habilitie"
] as const

export const LONG_RANGE_HABILITIES_ARRAY = [
    ...GENERIC_HABILITIES_ARRAY,
    "Disparo de Fogo"
] as const

export const MELEE_HABILITIES_ARRAY = [
    ...GENERIC_HABILITIES_ARRAY,
    "Podridão"
] as const

export const HELMET_HABILITIES_ARRAY = [
    ...GENERIC_HABILITIES_ARRAY,
    "Precisão"
] as const

export const BODY_ARMOR_HABILITIES_ARRAY = [
    ...GENERIC_HABILITIES_ARRAY,
    "Adrenalina",
    "Pele de Ferro",
    "Reflexo Felino"
] as const

export const GLOVES_HABILITIES_ARRAY = [
    ...GENERIC_HABILITIES_ARRAY,
    "Primeiros Socorros"
] as const

export const BOOTS_HABILITIES_ARRAY = [
    ...GENERIC_HABILITIES_ARRAY,
    "Passos Rápidos"
] as const
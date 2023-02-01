import { CS_Attributes, CS_Equipments, CS_Inventory, CS_Stats } from "./moduleTypes.js"

export const ENTITY_DEFAULT: {
    SOULS: number,
    LEVEL: number,
    ATTRIBUTES: CS_Attributes,
    EQUIPMENT: CS_Equipments,
    INVENTORY: CS_Inventory,
    BASE_STATS: CS_Stats,
    STATS_FROM_EQUIPS: CS_Stats,
    TOTAL_STATS: CS_Stats,
    CURRENT_HP: number,
    IS_ALIVE: boolean
} = {
    SOULS: 0,
    LEVEL: 1,
    ATTRIBUTES: {
        vitality: 0,
        agility: 0,
        strenght: 0,
        intelligence: 0
    },
    EQUIPMENT: {
        longRangeWeapon: { 
            name: "Empty", 
            type: "longRangeWeapon"
        },
        meleeWeapon: { 
            name: "Empty", 
            type: "meleeWeapon"
        },
        helmet: { 
            name: "Empty",
            type: "helmet"
        },
        bodyArmor: { 
            name: "Empty",
            type: "bodyArmor" 
        },
        gloves: { 
            name: "Empty",
            type: "gloves" 
        },
        boots: { 
            name: "Empty",
            type: "boots" 
        },
    },
    INVENTORY: {
        equipments: {
            longRangeWeapon: {
                array: [],
                type: "longRangeWeapon"
            },
            meleeWeapon: {
                array: [],
                type: "meleeWeapon"
            },
            helmet: {
                array: [],
                type: "helmet"
            },
            bodyArmor: {
                array: [],
                type: "bodyArmor"
            },
            gloves: {
                array: [],
                type: "gloves"
            },
            boots: {
                array: [],
                type: "boots"
            }
        },
        resources: {},
    },
    BASE_STATS: {

        hp:             0,
        evasion:        0,

        fisicalDamage:  0,
        fireDamage:     0,
        iceDamage:      0,
        thunderDamage:  0,
        poisonDamage:   0,

        fisicalDefense: 0,
        fireDefense:    0,
        iceDefense:     0,
        thunderDefense: 0,
        poisonDefense:  0
    },
    STATS_FROM_EQUIPS: {

        hp:             0,
        evasion:        0,

        fisicalDamage:  0,
        fireDamage:     0,
        iceDamage:      0,
        thunderDamage:  0,
        poisonDamage:   0,

        fisicalDefense: 0,
        fireDefense:    0,
        iceDefense:     0,
        thunderDefense: 0,
        poisonDefense:  0
    },
    TOTAL_STATS: {

        hp:             0,
        evasion:        0,

        fisicalDamage:  0,
        fireDamage:     0,
        iceDamage:      0,
        thunderDamage:  0,
        poisonDamage:   0,

        fisicalDefense: 0,
        fireDefense:    0,
        iceDefense:     0,
        thunderDefense: 0,
        poisonDefense:  0
    },
    CURRENT_HP: 1,
    IS_ALIVE: true
}
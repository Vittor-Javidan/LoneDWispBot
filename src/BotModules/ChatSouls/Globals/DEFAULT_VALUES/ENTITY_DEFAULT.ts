import { CS_Attributes, CS_Equipments, CS_HabilitiesSlots, CS_Inventory, CS_Stats } from "../moduleTypes.js"

export const ENTITY_DEFAULT: {
    SOULS: number,
    LEVEL: number,
    ATTRIBUTES: CS_Attributes,
    EQUIPMENT: CS_Equipments,
    HABILITIES: CS_HabilitiesSlots
    INVENTORY: CS_Inventory,
    EMPTY_STATS: CS_Stats,
    CURRENT_HP: number,
    CURRENT_MANA: number,
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
            type: "longRangeWeapon",
        },
        meleeWeapon: { 
            name: "Empty", 
            type: "meleeWeapon",
        },
        helmet: { 
            name: "Empty",
            type: "helmet",
        },
        bodyArmor: { 
            name: "Empty",
            type: "bodyArmor",
        },
        gloves: { 
            name: "Empty",
            type: "gloves",
        },
        boots: { 
            name: "Empty",
            type: "boots",
        },
    },
    HABILITIES: {
        1: {
            name: "Empty",
            rank: 0,
        },
        2: {
            name: "Empty",
            rank: 0,
        },
        3: {
            name: "Empty",
            rank: 0,
        },
        4: {
            name: "Empty",
            rank: 0,
        },
        5: {
            name: "Empty",
            rank: 0,
        },
        6: {
            name: "Empty",
            rank: 0,
        }
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
        habilities: [],
        resources: {},
    },
    EMPTY_STATS: {
        hp:             0,
        mana:           0,
        evasion:        0,
        accuracy:       0,

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
    CURRENT_MANA: 0,
    IS_ALIVE: true
}
import { CS_Attributes, CS_Catalog_MapAreas, CS_Equipments, CS_HabilitiesSlots, CS_PlayerState } from "../moduleTypes.js"

export const PLAYER_DEFAULT: {
    ATTRIBUTES: CS_Attributes,
    EQUIPMENTS: CS_Equipments,
    HABILITIES: CS_HabilitiesSlots,
    STATES: CS_PlayerState,
    CURRENT_LOCATION: CS_Catalog_MapAreas
} = {
    ATTRIBUTES: {
        vitality:       10,
        agility:        10,
        strenght:       10,
        intelligence:   10
    },
    EQUIPMENTS: {
        longRangeWeapon: {
            name: 'Arco de madeira',
            type: "longRangeWeapon",
        },
        meleeWeapon:     {
            name: 'Adaga',
            type: "meleeWeapon",
        },
        helmet:          {
            name: 'Chapéu de caçador',
            type: "helmet",
        },
        bodyArmor:       {
            name: 'Roupa de caçador',
            type: "bodyArmor",
        },
        gloves:          {
            name: 'Luvas de caçador',
            type: "gloves",
        },
        boots:           {
            name: 'Botas de caçador',
            type: "boots",
        }
    },
    HABILITIES: {
        longRangeWeapon: {
            name: "Disparo de Fogo",
            rank: 1,
            type: "longRangeWeapon"
        },
        meleeWeapon: {
            name: "Podridão",
            rank: 1,
            type: "meleeWeapon"
        },
        helmet: {
            name: "Precisão",
            rank: 1,
            type: "helmet"
        },
        bodyArmor: {
            name: "Reflexo Felino",
            rank: 1,
            type: "bodyArmor"
        },
        gloves: {
            name: "Primeiros Socorros",
            rank: 1,
            type: "gloves"
        },
        boots: {
            name: "Passos Rápidos",
            rank: 1,
            type: "boots"
        }
    },
    STATES: {
        primary: "FIRE_PIT",
        secondary: "RESTING_ON_FIRE_PIT"
    },
    CURRENT_LOCATION: "theWoods"
}

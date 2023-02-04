import { CS_EntityData } from "../../../../Globals/moduleTypes.js";

export function get_BANDIDO(): CS_EntityData {
    return {
        level: 5,
        name: "Bandido",
        souls: 500,
        attributes: {
            vitality: 10,
            agility: 15,
            strenght: 10,
            intelligence: 10
        },
        equipment: {
            longRangeWeapon: {
                name: "Empty",
                type: "longRangeWeapon"
            },
            meleeWeapon: { 
                name: "Adaga",
                type: "meleeWeapon"
            },
            helmet: {
                name: "Empty",
                type: "helmet"
            },
            bodyArmor: { 
                name: "Roupa de caçador", 
                type: "bodyArmor"
            },
            gloves: {
                name: "Empty",
                type: "gloves"
            },
            boots: {
                name: "Empty",
                type: "boots"
            }
        },
        habilities: {
            longRangeWeapon: {
                name: "Empty",
                rank: 0,
                type: "longRangeWeapon"
            },
            meleeWeapon: {
                name: "Empty",
                rank: 0,
                type: "meleeWeapon"
            },
            helmet: {
                name: "Empty",
                rank: 0,
                type: "helmet"
            },
            bodyArmor: {
                name: "Empty",
                rank: 0,
                type: "bodyArmor"
            },
            gloves: {
                name: "Empty",
                rank: 0,
                type: "gloves"
            },
            boots: {
                name: "Empty",
                rank: 0,
                type: "boots"
            }
        },
        inventory: {
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
            resources: {
                "Dados viciados": {
                    name: "Dados viciados",
                    amount: 1,
                    type: "recurso",
                    dropChance: 0.5,
                    description: "Usados para apostar e roubar dinheiro de tolos. Alguns caçadores de recompensas costumam colecioná-los para se que se lembrem de todos os bandidos já levados a justiça."
                },
                "Bolsa de Água": {
                    name: "Bolsa de Água",
                    type: "comida",
                    amount: 1,
                    dropChance: 0.5,
                    description: "Água potável."
                }
            }
        }
    }
} 
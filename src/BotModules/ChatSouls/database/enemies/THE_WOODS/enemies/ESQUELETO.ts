import { CS_EntityData } from "../../../../Globals/moduleTypes.js";

export function get_ESQUELETO(): CS_EntityData {
    return {
        level: 20,
        name: "Esqueleto",
        souls: 2000,
        attributes: {
            vitality: 10,
            agility: 20,
            strenght: 20,
            intelligence: 10
        },
        equipment: {
            longRangeWeapon: {
                name: "Empty",
                type: "longRangeWeapon"
            },
            meleeWeapon: { 
                name: "Espada enferrujada",
                type: "meleeWeapon"
            },
            helmet: { 
                name: "Elmo enferrujado", 
                type: "helmet"
            },
            bodyArmor: { 
                name: "Armadura enferrujada", 
                type: "bodyArmor"
            },
            gloves: { 
                name: "Luvas enferrujadas", 
                type: "gloves"
            },
            boots: { 
                name: "Botas enferrujadas", 
                type: "boots"
            }
        },
        habilities: {
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
                "Ossos": {
                    name: "Ossos",
                    amount: 1,
                    type: "recurso",
                    dropChance: 1,
                    description: "Ossos apodrecidos. Uma aura sinistra é sentida."
                },
                "Metal Enferrujado": {
                    name: "Metal Enferrujado",
                    amount: 1,
                    type: "recurso",
                    dropChance: 0.3,
                    description: "Metal com muita ferrugem. Apesar de forte, possui um peso muito grande."
                },
                "Dente de ouro": {
                    name: "Dente de ouro",
                    amount: 1,
                    dropChance: 0.05,
                    type: "recurso",
                    description: "Dentes de ouro! talvez encontrará algum uso a eles."
                }
            }
        }
    }
} 
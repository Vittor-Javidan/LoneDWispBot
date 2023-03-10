import { CS_EntityData } from "../../../../Globals/moduleTypes.js";

export function get_JAVALI(): CS_EntityData {
    return {
        level: 1,
        name: "Javali",
        souls: 100,
        attributes: {
            vitality: 10,
            agility: 10,
            strenght: 10,
            intelligence: 10
        },
        equipment: {
            longRangeWeapon: {
                name: "Cuspida tóxica",
                type: "longRangeWeapon",
            },
            meleeWeapon: {
                name: "Garras de Javali",
                type: "meleeWeapon",
            },
            helmet: {
                name: "Crânio endurecido",
                type: "helmet",
            },
            bodyArmor: {
                name: "Pele de Javali",
                type: "bodyArmor",
            },
            gloves: {
                name: "Patas de javali",
                type: "gloves",
            },
            boots: {
                name: "Patas de javali",
                type: "boots",
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
            habilities: [],
            resources: {
                "Couro de Javali": {
                    name: "Couro de Javali",
                    amount: 1,
                    type: "couro",
                    dropChance: 0.5,
                    description: "Couro de um javali. Forte e resistente, porém nada nobre.",
                },
                "Carne de Javali": {
                    name: "Carne de Javali",
                    amount: 1,
                    type: "comida",
                    dropChance: 0.5,
                    description: "Carne de um javali. Cheio de proteínas e delicioso se preparado do jeito correto.",
                },
                "Dente de Javali": {
                    name: "Dente de Javali",
                    amount: 2,
                    type: "recurso",
                    dropChance: 0.1,
                    description: "Dentes de javali. Bastante usado para confecção de acessórios.",
                }
            }
        }
    }
}
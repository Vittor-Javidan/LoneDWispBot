import { CS_EntityData } from "../../../../Globals/moduleTypes.js";

export function get_LOBO(): CS_EntityData {
    return {
        level: 10,
        name: "Lobo",
        souls: 1000,
        attributes: {
            vitality: 13,
            agility: 13,
            strenght: 14,
            intelligence: 10
        },
        equipment: {
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
                "Couro de Lobo": {
                    name: "Couro de Lobo",
                    amount: 1,
                    type: "couro",
                    dropChance: 0.5,
                    description: "Couro de um lobo. Essencial para confecção de agasalhos no inverno."
                },
                "Carne de Lobo": {
                    name: "Carne de Lobo",
                    amount: 1,
                    type: "comida",
                    dropChance: 0.3,
                    description: "Carne de Lobo. Dura igual pedra! Mas no desespero da fome, tudo vale."
                },
                "Dente de Lobo": {
                    name: "Dente de Lobo",
                    amount: 2,
                    dropChance: 0.2,
                    type: "recurso",
                    description: "Dentes de javali. Tão afiado que algumas tribos os utilizam com o propósito de se fazer incisões na pele."
                }
            }
        }
    }
}
import { CS_Catalog_TestArea_Enemies, CS_EntityData } from "../../../Globals/moduleTypes.js"

export default function get_TEST_AREA_ENEMIES_DATA(): Record<CS_Catalog_TestArea_Enemies, CS_EntityData> {
    return {
        "Dummy Enemie": get_DUMMY_ENEMIE()
    }
}

export function get_DUMMY_ENEMIE(): CS_EntityData {
    return {
        level: 1,
        name: "Dummy Enemie",
        souls: 1000,
        attributes: {
            vitality: 1,
            agility: 1,
            strenght: 1,
            intelligence: 1
        },
        equipment: {
            longRangeWeapon: {
                name: "Dummy Equipment", 
                type: "longRangeWeapon"
            },
            meleeWeapon: {
                name: "Dummy Equipment", 
                type: "meleeWeapon"
            },
            helmet: {
                name: "Dummy Equipment", 
                type: "helmet"
            },
            bodyArmor: {
                name: "Dummy Equipment", 
                type: "bodyArmor"
            },
            gloves: {
                name: "Dummy Equipment", 
                type: "gloves"
            },
            boots: {
                name: "Dummy Equipment", 
                type: "boots"
            }
        },
        habilities: {
            1: {
                name: "Dummy Habilitie",
                rank: 1,
            },
            2: {
                name: "Dummy Habilitie",
                rank: 1
            },
            3: {
                name: "Dummy Habilitie",
                rank: 1,
            },
            4: {
                name: "Dummy Habilitie",
                rank: 1,
            },
            5: {
                name: "Dummy Habilitie",
                rank: 1,
            },
            6: {
                name: "Dummy Habilitie",
                rank: 1,
            },
        },
        inventory: {
            equipments: {
                longRangeWeapon: {
                    array: [
                        {
                            name: "Dummy Equipment",
                            type: "longRangeWeapon"
                        }, 
                        {
                            name: "Dummy Equipment",
                            type: "longRangeWeapon"
                        }],
                    type: "longRangeWeapon"
                },
                meleeWeapon: {
                    array: [
                        {
                            name: "Dummy Equipment",
                            type: "meleeWeapon"
                        }, 
                        {
                            name: "Dummy Equipment",
                            type: "meleeWeapon"
                        }
                    ],
                    type: "meleeWeapon"
                },
                helmet: {
                    array: [
                        {
                            name: "Dummy Equipment",
                            type: "helmet"
                        }, 
                        {
                            name: "Dummy Equipment",
                            type: "helmet"
                        }
                    ],
                    type: "helmet"
                },
                bodyArmor: {
                    array: [
                        {
                            name: "Dummy Equipment",
                            type: "bodyArmor"
                        }, 
                        {
                            name: "Dummy Equipment",
                            type: "bodyArmor"
                        }
                    ],
                    type: "bodyArmor"
                },
                gloves: {
                    array: [
                        {
                            name: "Dummy Equipment",
                            type: "gloves"
                        }, 
                        {
                            name: "Dummy Equipment",
                            type: "gloves"
                        }
                    ],
                    type: "gloves"
                },
                boots: {
                    array: [
                        {
                            name: "Dummy Equipment",
                            type: "boots"
                        },    
                        {
                            name: "Dummy Equipment",
                            type: "boots"
                        }    
                    ],
                    type: "boots"
                }
            },
            habilities: [],
            resources: {
                "Dummy Resource": {
                    name: "Dummy Resource",
                    amount: 1,
                    type: "Test",
                    dropChance: 1,
                    description: "This is just a item for tests",
                }
            }
        }
    }
}
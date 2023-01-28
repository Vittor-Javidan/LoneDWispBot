import { expect, test } from 'vitest'
import { getBodyArmor, getBoots, getGloves, getHelmet, getLongRange, getMelee } from '../database/equipment/data'
import { ENTITY_DEFAULT } from '../Globals/ENTITY_DEFAULT'
import { GAME_BALANCE } from '../Globals/GAME_BALANCE'
import {
    CS_Attributes, CS_EquipmentInventory_Object, CS_Inventory,
    CS_Inventory_Equipments,
    CS_Inventory_Resources,
    CS_ResourceData,
    CS_Stats
} from '../Globals/moduleTypes'
import Entity from './Entity'

//=================================================================================================
// CONSTRUCTOR ====================================================================================
//=================================================================================================

test(`Constructor 
    - should instantiate with default properties
`, () => {

    const name = "Entity: constructor"
    const entity = new Entity(name)
    
    expect(entity.getName()).toBe(name)
    expect(entity.getIsAlive()).toBe(true)
    expect(entity.getlevel()).toBe(1)
    expect(entity.getAttributes()).toStrictEqual(structuredClone(ENTITY_DEFAULT.ATTRIBUTES))
    expect(entity.getAllCurrentEquipments()).toStrictEqual(structuredClone(ENTITY_DEFAULT.EQUIPMENT))
    expect(entity.getInventory()).toStrictEqual(structuredClone(ENTITY_DEFAULT.INVENTORY))
    expect(entity.getTotalStats()).toStrictEqual(structuredClone(ENTITY_DEFAULT.TOTAL_STATS))
    expect(entity.getBaseStats()).toStrictEqual(structuredClone(ENTITY_DEFAULT.BASE_STATS))
    expect(entity.getEquipmentStats()).toStrictEqual(structuredClone(ENTITY_DEFAULT.STATS_FROM_EQUIPS))
})

//=================================================================================================
// SETTERS AND GETTERS ============================================================================
//=================================================================================================

test(`
    getName
    setName
`, () => {

    const entity = new Entity("Entity: name")
    
    entity.setName("noob")
    const retrievedName = entity.getName()
    
    expect(retrievedName).toBe("noob")
})

test(`
    getIsAlive
    setIsAlive
`, () => {

    const entity = new Entity("Entity: isAlive")
    
    entity.setIsAlive(false)
    const retrieveIsAlive = entity.getIsAlive()

    expect(retrieveIsAlive).toBe(false)
})

test(`
    getCurrentHP
    setCurrentHP
`, () => {

    const entity = new Entity("Entity: currentHP")

    entity.setCurrentHP(143)
    const retrivedCurrentHP = entity.getCurrentHP()

    expect(retrivedCurrentHP).toBe(143)
})

test(`
    getSouls
    setSouls
`, () => {

    const entity = new Entity("Entity: souls")
    
    entity.setSouls(1000)
    const retrievedSouls = entity.getSouls() 
    
    expect(retrievedSouls).toBe(1000)
})

test(`setSouls 
    - thows error when set negative
`, () => {

    const entity = new Entity("Entity: souls")
    
    expect(() => entity.setSouls(-1000)).toThrow(
        Error('Error: Entity class, souls cannot be negative')
    )
})

test(`
    getlevel 
    setlevel
`, () => {

    const entity = new Entity("Entity: level")

    entity.setlevel(64)
    const retrievedLevel = entity.getlevel() 
    
    expect(retrievedLevel).toBe(64)
})

test(`setlevel 
    - throws error when set to a negative number
`, () => {

    const entity = new Entity("Entity: level")
    
    expect(() => entity.setlevel(-10)).toThrow(
        Error('Error: Entity class, level cannot be negative')
    )
})

test(`
    getAttributes
    setAttributes
`, () => {

    const entity = new Entity("Entity: attributes setter/getter")
    const attributes: CS_Attributes = {
        vitality: 10,
        agility: 33,
        strenght: 44,
        intelligence: 22
    } 
    
    entity.setAttributes(attributes)
    const retrievedAttributes = entity.getAttributes() 
    
    expect(retrievedAttributes).toStrictEqual(attributes)
})

test(`
    getAllCurrentEquipments
    setAllCurrentEquipments
`, () => {

    const entity = new Entity("Entity: currentEquipment setter/getter")
    const equipment = {
        meleeWeapon:     getMelee('Dummy Equipment'),
        longRangeWeapon: getLongRange('Dummy Equipment'),
        helmet:          getHelmet('Dummy Equipment'),
        bodyArmor:       getBodyArmor('Dummy Equipment'),
        gloves:          getGloves('Dummy Equipment'),
        boots:           getBoots('Dummy Equipment')
    }
    
    entity.setAllCurrentEquipments(equipment)
    const retrievedEquipment = entity.getAllCurrentEquipments()
    
    expect(retrievedEquipment).toStrictEqual(equipment)
})

test(`
    getCurrentEquipment
    setCurrentEquipment
`, () => {

    const entity = new Entity("Entity: inventory setter/getter")
    const currentEquipment = getMelee('Dummy Equipment')
    const type = currentEquipment.type
    
    entity.setCurrentEquipment(currentEquipment)
    const retrievedEquipment = entity.getCurrentEquipment(type)
    
    expect(retrievedEquipment).toStrictEqual(currentEquipment)
})

test(`
    setInventory
    getInventory
`, () => {

    const entity = new Entity("Entity: inventory setter/getter")
    const inventory: CS_Inventory = {
        equipments: {
            longRangeWeapon: {
                array: [getLongRange('Dummy Equipment')],
                type: 'longRangeWeapon'
            },
            meleeWeapon: {
                array: [getMelee('Dummy Equipment')],
                type: 'meleeWeapon'
            },
            helmet: {
                array: [getHelmet('Dummy Equipment')],
                type: 'helmet'
            },
            bodyArmor: {
                array: [getBodyArmor('Dummy Equipment')],
                type: 'bodyArmor'
            },
            gloves: {
                array: [getGloves('Dummy Equipment')],
                type: 'gloves'
            },
            boots: {
                array: [getBoots('Dummy Equipment')],
                type: 'boots'
            }
        },
        resources: {
            "Fake Rsource": {
                name: "Fake Rsource",
                amount: 10,
                type: "Fake Type"
            }
        }
    } 
    
    entity.setInventory(inventory)
    const retrievedInventory = entity.getInventory()
    
    expect(retrievedInventory).toStrictEqual(inventory)
})

test(`
    getAllInventoryEquipments
    setAllInventoryEquipments
`, () => {

    const entity = new Entity("Entity: inventory setter/getter")
    const inventoryEquipments: CS_Inventory_Equipments = {
        longRangeWeapon: {
            array: [getLongRange('Dummy Equipment')],
            type: 'longRangeWeapon'
        },
        meleeWeapon: {
            array: [getMelee('Dummy Equipment')],
            type: 'meleeWeapon'
        },
        helmet: {
            array: [getHelmet('Dummy Equipment')],
            type: 'helmet'
        },
        bodyArmor: {
            array: [getBodyArmor('Dummy Equipment')],
            type: 'bodyArmor'
        },
        gloves: {
            array: [getGloves('Dummy Equipment')],
            type: 'gloves'
        },
        boots: {
            array: [getBoots('Dummy Equipment')],
            type: 'boots'
        }
    }
    
    entity.setAllInventoryEquipments(inventoryEquipments)
    const retrievedInventoryEquipments = entity.getAllInventoryEquipments()
    
    expect(retrievedInventoryEquipments).toStrictEqual(inventoryEquipments)
})

test(`
    getInventoryEquipments
    setInventoryEquipments
`, () => {

    const entity = new Entity("Entity: inventory setter/getter")
    const equipment = getMelee('Dummy Equipment')
    const type = equipment.type
    const inventoryEquipment = {
        array: [equipment],
        type: type
    }
    
    entity.setInventoryEquipments(inventoryEquipment)
    const retrievedInventoryEquipments = entity.getInventoryEquipments(type)
    
    expect(retrievedInventoryEquipments).toStrictEqual(inventoryEquipment)
})

test(`
    getInventoryResources
    setInventoryResources
`, () => {

    const entity = new Entity("Entity: inventoryResources setter/getter")
    const resources: CS_Inventory_Resources = {
        "Fake Resource": {
            name: "Fake Resource",
            type: "Fake Type",
            amount: 20
        }
    }
    
    entity.setInventoryResources(resources)
    const retrievedResources = entity.getInventoryResources()
    
    expect(retrievedResources).toStrictEqual(structuredClone(resources))
})

test(`
    getTotalStats
    setTotalStats
    getBaseStats
    setBaseStats
    getEquipmentStats
    setEquipmentStats
`, () => {

    const entity = new Entity("Entity: stats (total/base/fromEquips) setter/getter")
    const stats: CS_Stats = {
        hp: 66,
        evasion: 66,
        fisicalDamage: 66,
        fisicalDefense: 66,
        magicalDamage: 66,
        magicalDefense: 66
    }
    
    entity.setTotalStats(stats)
    entity.setBaseStats(stats)
    entity.setEquipmentStats(stats)
    const retrievedTotalStats = entity.getTotalStats()
    const retrievedBaseStats = entity.getBaseStats()
    const retrievedEquipmentStats = entity.getEquipmentStats()
    
    expect(retrievedTotalStats).toStrictEqual(stats)
    expect(retrievedBaseStats).toStrictEqual(stats)
    expect(retrievedEquipmentStats).toStrictEqual(stats)
})

//=================================================================================================
// INSTANCE METHODS ===============================================================================
//=================================================================================================

test(`addSouls 
    - should add souls
`, () => {

    const entity = new Entity("Entity: addSouls")    
    entity.setSouls(0)
    
    entity.addSouls(5000)
    
    expect(entity.getSouls()).toBe(5000)
})

test(`decreaseSouls 
    - should decrease souls
`, () => {

    const entity = new Entity("Entity: decreaseSouls")
    entity.setSouls(5000)

    entity.decreaseSouls(2000)
    
    expect(entity.getSouls()).toBe(3000)
})

test(`decreaseSouls 
    - shold set souls to 0 when balances become negative
`, () => {
    
    const entity = new Entity("Entity: decreaseSouls")    
    entity.setSouls(2000)

    entity.decreaseSouls(5000)
    
    expect(entity.getSouls()).toBe(0)
})

test(`addLevel
    - Should add Level by 1
`, () => {

    const entity = new Entity("Entity: addLevel")
    entity.setlevel(1)
    
    entity.addLevel()
    
    expect(entity.getlevel()).toBe(2)
})

test(`addAttributes
    - Should add attribute by 1 for the specified type
`, () => {

    const entity = new Entity("Entity: addAttributes")           
    entity.setAttributes({
        vitality: 68,
        agility: 68,
        strenght: 68,
        intelligence: 68
    })
    
    entity.addAttributes("vitality")
    
    expect(entity.getAttributes()).toStrictEqual({
        vitality: 69,
        agility: 68,
        strenght: 68,
        intelligence: 68
    })
})

test(`sortInventoryEquipments
    - Should sort the specified equipment alphabeticaly
`, () => {

    const entity = new Entity('Entity: sortInventoryEquipments')
    entity.setInventoryEquipments({
        array: [
            getGloves('Luvas enferrujadas'),
            getGloves('Luvas de caçador'),
            getGloves('Dummy Equipment'),
            getGloves('Empty'),
        ],
        type: 'gloves'
    })
    
    entity.sortInventoryEquipments('gloves')
    
    expect(entity.getInventoryEquipments('gloves')).toStrictEqual({
        array: [
            getGloves('Dummy Equipment'),
            getGloves('Empty'),
            getGloves('Luvas de caçador'),
            getGloves('Luvas enferrujadas'),
        ],
        type: 'gloves'
    })
})

test(`isInventoryEquipmentsTypeEmpty
    - Should "False" if equipments inventory has something, "True" otherwise
`, () => {

    const name = 'Entity: isInventoryEquipmentsTypeEmpty'
    const entity_1 = new Entity(`${name} 1`)
    const entity_2 = new Entity(`${name} 2`)
    entity_1.setInventoryEquipments({
        array: [],
        type: "longRangeWeapon"
    })
    entity_2.setInventoryEquipments({
        array: [getLongRange('Dummy Equipment')],
        type: "longRangeWeapon"
    })
    
    const answerTrue = entity_1.isInventoryEquipmentsTypeEmpty("longRangeWeapon")
    const answerFalse = entity_2.isInventoryEquipmentsTypeEmpty("longRangeWeapon")
    
    expect(answerTrue).toBe(true)
    expect(answerFalse).toBe(false)

})


test(`getEquipmentInventoryAmount
    - Should get the amount of equipments inside the specified type inventory
`, () => {

    const entity = new Entity('Entity: getEquipmentInventoryAmount')
    entity.setInventoryEquipments({
        array: [
            getLongRange('Dummy Equipment'), 
            getLongRange('Dummy Equipment')
        ],
        type: 'longRangeWeapon'
    })
    
    const amount = entity.getEquipmentInventoryAmount('longRangeWeapon')
    
    expect(amount).toBe(2)
})

test(`isSomethingEquipped
    - Should Return "True" if there is something equiped, "False" otherwise
`, () => {
    
    const name = 'Entity: getEquipmentInventoryAmount'
    const entity_1 = new Entity(name)
    const entity_2 = new Entity(name)
    entity_1.setCurrentEquipment(getMelee("Dummy Equipment")  )
    entity_2.setCurrentEquipment(getMelee("Empty"))
    
    const answerTrue = entity_1.isSomethingEquipped('meleeWeapon')
    const answerFalse = entity_2.isSomethingEquipped('meleeWeapon')
    
    expect(answerTrue).toBe(true)
    expect(answerFalse).toBe(false)
})

test(`equip
    - Should Equip when there is nothing equipped
`, () => {

    const entity = new Entity('Entity: getEquipmentInventoryAmount')
    const equipment = getMelee("Dummy Equipment")
    const emptyInventory: CS_EquipmentInventory_Object = {
        array: [],
        type: 'meleeWeapon'
    }
    entity.setCurrentEquipment(getMelee("Empty"))
    entity.setInventoryEquipments(emptyInventory)
    
    entity.equip(equipment)
    
    expect(entity.getCurrentEquipment(equipment.type)).toStrictEqual(equipment)
    expect(entity.getInventoryEquipments(equipment.type)).toStrictEqual(emptyInventory)
})

test(`equip
    - Should Equip when there is something equipped
`, () => {

    const entity = new Entity('Entity: getEquipmentInventoryAmount')
    const equipment_1 = getMelee("Dummy Equipment")
    const equipment_2 = getMelee('Adaga')
    entity.setCurrentEquipment(equipment_1)
    entity.setInventoryEquipments({
        array: [],
        type: 'meleeWeapon'
    })
    
    entity.equip(equipment_2)
    
    expect(entity.getCurrentEquipment('meleeWeapon')).toStrictEqual(equipment_2)
    expect(entity.getInventoryEquipments('meleeWeapon')).toStrictEqual({
        array: [equipment_1],
        type: "meleeWeapon"
    })
})

test(`unequip
    - Should unequip the current equiped item
`, () => {

    const entity = new Entity('Entity: getEquipmentInventoryAmount')
    entity.setCurrentEquipment(getMelee('Dummy Equipment'))
    
    entity.unequip('meleeWeapon')
    
    expect(entity.getCurrentEquipment('meleeWeapon')).toStrictEqual({
        name: "Empty",
        type: 'meleeWeapon'
    })
})

test(`equipFromInventory
    - Should equip from inventory
`, () => {

    const entity = new Entity('Entity: getEquipmentInventoryAmount')
    const equipment_1 = getMelee('Dummy Equipment')
    const equipment_2 = getMelee('Adaga')
    
    entity.setInventoryEquipments({
        array: [equipment_1, equipment_2],
        type: 'meleeWeapon'
    })
    
    entity.equipFromInventory(1, "meleeWeapon")
    
    expect(entity.getCurrentEquipment("meleeWeapon")).toStrictEqual(equipment_2)
    expect(entity.getInventoryEquipments("meleeWeapon")).toStrictEqual({
        array: [equipment_1],
        type: 'meleeWeapon'
    })
})

test(`equipFromInventory
    - Throws error When index out of boundaries
`, () => {

    const entity = new Entity('Entity: getEquipmentInventoryAmount')
    entity.setInventoryEquipments({
        array: [
            getMelee('Dummy Equipment'), 
            getMelee('Dummy Equipment')
        ],
        type: 'meleeWeapon'
    })
    
    expect(() => entity.equipFromInventory(2, "meleeWeapon")).toThrow(
        Error(`ERROR: Entity class, "equipFromInventory": itemIndex out of boundaries`)
    )
})

test(`pushToInventory
    - Should push to inventory
`, () => {
    
    const entity = new Entity('Entity: getEquipmentInventoryAmount')
    entity.setInventoryEquipments({
        array: [
            getMelee('Dummy Equipment'), 
            getMelee('Dummy Equipment')
        ],
        type: 'meleeWeapon'
    })
    
    entity.pushToInventory(getMelee('Adaga'))
    
    expect(entity.getInventoryEquipments('meleeWeapon')).toStrictEqual({
        array: [
            getMelee('Dummy Equipment'), 
            getMelee('Dummy Equipment'),
            getMelee('Adaga')
        ],
        type: 'meleeWeapon'
    })
})

test(`getAllEquipmentInventoryString
    - Should return a formated string of chosen inventory
`, () => {

    const entity = new Entity('Entity: getAllEquipmentInventoryString')    
    entity.setInventoryEquipments({
        array: [
            getMelee('Dummy Equipment'), 
            getMelee('Dummy Equipment')
        ],
        type: 'meleeWeapon'
    })
    
    expect(entity.getAllEquipmentInventoryString('meleeWeapon'))
        .toBe(`| 1. Dummy Equipment | 2. Dummy Equipment `)
})

test(`addResources
    - Should add resources to entity inventory when resorce is not defined
`, () => {

    const entity = new Entity('Entity: addResources')
    const resource: CS_ResourceData = {
        name: "Fake Resource",
        amount: 1,
        type: "Fake type"
    }
    
    //Setup
    entity.setInventoryResources({})
    
    //Run and Test 1
    entity.addResources(resource)
    expect(entity.getInventoryResources()).toStrictEqual({
        "Fake Resource": {
            name: "Fake Resource",
            amount: 1,
            type: "Fake type"
        }
    })
    
    //Run and Test 2
    entity.addResources(resource)
    expect(entity.getInventoryResources()).toStrictEqual({
        "Fake Resource": {
            name: "Fake Resource",
            amount: 2,
            type: "Fake type"
        }
    })
})

test(`addResources
    - Should add resources to entity inventory when resorce is already defined
`, () => {

    const entity = new Entity('Entity: addResources()')
    const resource: CS_ResourceData = {
        name: "Fake Resource",
        amount: 1,
        type: "Fake type"
    }
    entity.setInventoryResources({
        "Fake Resource": resource
    })

    entity.addResources(resource)

    expect(entity.getInventoryResources()).toStrictEqual({
        "Fake Resource": {
            name: "Fake Resource",
            amount: 2,
            type: "Fake type"
        }
    })
})

test(`removeResources
    - Should remove resources by just deacreasing amount
`, () => {

    const entity = new Entity('Entity: removeResources()')
    entity.setInventoryResources({
        "Fake Resource": {
            name: "Fake Resource",
            amount: 2,
            type: "Fake Type"
        }
    })

    entity.removeResources("Fake Resource", 1)
    
    expect(entity.getInventoryResources()).toStrictEqual({
        "Fake Resource": {
            name: "Fake Resource",
            amount: 1,
            type: "Fake Type"
        }
    })
})

test(`removeResources
    - Should remove resources by removing the key and value from inventory
`, () => {

    const entity = new Entity('Entity: removeResources()')
    entity.setInventoryResources({
        "Fake Resource": {
            name: "Fake Resource",
            amount: 1,
            type: "Fake Type"
        }
    })

    entity.removeResources("Fake Resource", 1)

    expect(entity.getInventoryResources()).toStrictEqual({})
})

test(`recoverHP
    - Should recover entity HP
`, () => {

    const entity = new Entity('Entity: recoverHP()')    
    entity.setCurrentHP(1)
    entity.setTotalStats({
        hp:             1000,
        evasion:        1000,
        fisicalDamage:  1000,
        fisicalDefense: 1000,
        magicalDamage:  1000,
        magicalDefense: 1000,
    })
    
    entity.recoverHP()
    
    expect(entity.getCurrentHP()).toBe(1000)
})

test(`inflictDamage
    - should inflict damage on current HP
`, () => {

    const entity_1 = new Entity('Entity: inflictDamage')
    entity_1.setCurrentHP(1000)
    
    entity_1.inflictDamage(400)
    
    expect(entity_1.getCurrentHP()).toBe(600)
    expect(entity_1.getIsAlive()).toBe(true)
})


test(`inflictDamage
    - should kill when current HP goes to zero or bellow
`, () => {

    const entity = new Entity('Entity: inflictDamage')
    entity.setCurrentHP(1)
    
    entity.inflictDamage(1)
    
    expect(entity.getCurrentHP()).toBeLessThanOrEqual(0)
    expect(entity.getIsAlive()).toBe(false)
})

test(`ressurrect
    - Should ressurrect
`, () => {

    const entity = new Entity('Entity: ressurrect')
    entity.setIsAlive(false)

    entity.ressurrect()

    expect(entity.getIsAlive()).toBe(true)
})

test(`kill
    - Should kill
`, () => {

    const entity = new Entity('Entity: ressurrect')
    entity.setIsAlive(true)

    entity.kill()

    expect(entity.getIsAlive()).toBe(false)
})


test(`calculateBaseStats
    - Should calculate stats from entity attributes
`, () => {

    const balanceWeight = GAME_BALANCE.STATS_WEIGHT
    const entity = new Entity('Entity: calculateBaseStats')
    entity.setAttributes({
        vitality: 10,
        agility: 10,
        strenght: 10,
        intelligence: 10
    })

    entity.calculateBaseStats()

    expect(entity.getBaseStats()).toStrictEqual({
        hp:             10 * balanceWeight.HP,
        evasion:        10 * balanceWeight.EVASION,
        fisicalDamage:  10 * balanceWeight.FISICAL_DMG,
        fisicalDefense: 10 * balanceWeight.FISICAL_DEF,
        magicalDamage:  10 * balanceWeight.MAGICAL_DMG,
        magicalDefense: 10 * balanceWeight.MAGICAL_DEF
    })
})

test(`calculateStatsFromEquips 
    - Should calculate stats from equipments
`, () => {
    
    const balanceWeight = GAME_BALANCE.STATS_WEIGHT
    const entity = new Entity('Entity: calculateStatsFromEquips()')
    const attributes: CS_Attributes = {
        vitality: 10,
        agility: 10,
        strenght: 10,
        intelligence: 10
    }
    entity.setAttributes(attributes)
    entity.setAllCurrentEquipments({
        longRangeWeapon: getLongRange('Dummy Equipment'),
        meleeWeapon: getMelee('Dummy Equipment'),
        helmet: getHelmet('Dummy Equipment'),
        bodyArmor: getBodyArmor('Dummy Equipment'),
        gloves: getGloves('Dummy Equipment'),
        boots: getBoots('Dummy Equipment')
    }) 

    entity.calculateStatsFromEquips()
    
    expect(entity.getEquipmentStats()).toStrictEqual({          // Each "Dummy Equipment" give 100 for each multiplier
        hp:             balanceWeight.HP           * attributes.vitality      * 100 * 6, // 6 "Dummy Equipment" amount
        evasion:        balanceWeight.EVASION      * attributes.agility       * 100 * 6, // 6 "Dummy Equipment" amount
        fisicalDamage:  balanceWeight.FISICAL_DMG  * attributes.strenght      * 100 * 2, // 2 "Dummy Equipment" amount
        fisicalDefense: balanceWeight.FISICAL_DEF  * attributes.strenght      * 100 * 4, // 4 "Dummy Equipment" amount
        magicalDamage:  balanceWeight.MAGICAL_DMG  * attributes.intelligence  * 100 * 2, // 2 "Dummy Equipment" amount
        magicalDefense: balanceWeight.MAGICAL_DEF  * attributes.intelligence  * 100 * 4, // 4 "Dummy Equipment" amount
    })
})

test(`calculateStats
    - Should calculate total entity stats
`, () => {
        
    const balanceWeight = GAME_BALANCE.STATS_WEIGHT
    const entity = new Entity('Entity: calculateStats()')
    const attributes: CS_Attributes = {
        vitality: 10,
        agility: 10,
        strenght: 10,
        intelligence: 10
    }
    entity.setAttributes(attributes)
    entity.setAllCurrentEquipments({
        longRangeWeapon: getLongRange('Dummy Equipment'),
        meleeWeapon: getMelee('Dummy Equipment'),
        helmet: getHelmet('Dummy Equipment'),
        bodyArmor: getBodyArmor('Dummy Equipment'),
        gloves: getGloves('Dummy Equipment'),
        boots: getBoots('Dummy Equipment')
    })

    entity.calculateStats()
    
    expect(entity.getTotalStats()).toStrictEqual({           
        hp:             (attributes.vitality     * balanceWeight.HP         ) + (balanceWeight.HP           * attributes.vitality     * 100 * 6),          
        evasion:        (attributes.agility      * balanceWeight.EVASION    ) + (balanceWeight.EVASION      * attributes.agility      * 100 * 6),
        fisicalDamage:  (attributes.strenght     * balanceWeight.FISICAL_DMG) + (balanceWeight.FISICAL_DMG  * attributes.strenght     * 100 * 2),
        fisicalDefense: (attributes.strenght     * balanceWeight.FISICAL_DEF) + (balanceWeight.FISICAL_DEF  * attributes.strenght     * 100 * 4),
        magicalDamage:  (attributes.intelligence * balanceWeight.MAGICAL_DMG) + (balanceWeight.MAGICAL_DMG  * attributes.intelligence * 100 * 2),
        magicalDefense: (attributes.intelligence * balanceWeight.MAGICAL_DEF) + (balanceWeight.MAGICAL_DEF  * attributes.intelligence * 100 * 4),
    })
})
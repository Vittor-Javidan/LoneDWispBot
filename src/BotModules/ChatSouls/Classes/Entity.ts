import { ENTITY_DEFAULT } from '../Globals/ENTITY_DEFAULT.js'
import { GAME_BALANCE } from '../Globals/GAME_BALANCE.js'
import Armor from './Equipments/Armor.js'
import BodyArmor from './Equipments/BodyArmor.js'
import Boots from './Equipments/Boots.js'
import Equipment from './Equipments/Equipment.js'
import Gloves from './Equipments/Gloves.js'
import Helmet from './Equipments/Helmet.js'
import LongRangeWeapon from './Equipments/LongRangeWeapon.js'
import MeleeWeapon from './Equipments/MeleeWeapon.js'
import Weapon from './Equipments/Weapon.js'

import { EQUIPMENT_TYPES_ARRAY } from '../Globals/EQUIPMENTS_ENTRY.js'
import {
    CS_Attributes,
    CS_AttributeTypes,
    CS_EquipmentData,
    CS_EquipmentInventory_Object,
    CS_Equipments,
    CS_EquipmentTypes,
    CS_Inventory,
    CS_Inventory_Equipments,
    CS_Inventory_Resources, CS_ResourceData,
    CS_Stats
} from '../Types/moduleTypes.js'

export default class Entity {

    //=================================================================================================
    // PROPERTIES =====================================================================================
    //=================================================================================================

    private _name: string = ''
    private _isAlive: boolean = ENTITY_DEFAULT.IS_ALIVE
    private _souls: number = ENTITY_DEFAULT.SOULS
    private _level: number = ENTITY_DEFAULT.LEVEL
    private _currentHP: number = ENTITY_DEFAULT.CURRENT_HP
    private _attributes: CS_Attributes = structuredClone(ENTITY_DEFAULT.ATTRIBUTES)
    private _currentEquipment: CS_Equipments = structuredClone(ENTITY_DEFAULT.EQUIPMENT)
    private _inventory: CS_Inventory = structuredClone(ENTITY_DEFAULT.INVENTORY)
    private _totalStats: CS_Stats = structuredClone(ENTITY_DEFAULT.TOTAL_STATS)
    private _baseStats: CS_Stats = structuredClone(ENTITY_DEFAULT.BASE_STATS)
    private _statsFromEquips: CS_Stats = structuredClone(ENTITY_DEFAULT.STATS_FROM_EQUIPS)

    //=================================================================================================
    // CONSTRUCTOR ====================================================================================
    //=================================================================================================

    constructor(name: string) {
        this.setName(name)
    }

    //=================================================================================================
    // GETTERS AND SETTERS ============================================================================
    //=================================================================================================

    getName(): string { return this._name }
    setName(entityName: string): void {

        this._name = entityName
    }

    getIsAlive(): boolean { return this._isAlive}
    setIsAlive(boolean: boolean): void {

        this._isAlive = boolean
    }

    getCurrentHP(): number { return this._currentHP }
    setCurrentHP(value: number): void {
        
        this._currentHP = value
    }

    getSouls(): number { return this._souls }
    setSouls(amount: number): void {
        
        if(amount < 0) {
            throw Error('Error: Entity class, souls cannot be negative')
        } 

        this._souls = amount
    }

    getlevel(): number { return this._level }
    setlevel(level: number): void {

        if(level < 0) {
            throw Error('Error: Entity class, level cannot be negative')
        }
        
        this._level = level
    }

    getAttributes(): CS_Attributes { return this._attributes }
    setAttributes(object: CS_Attributes): void {

        this._attributes = structuredClone(object)
    }

    getAllCurrentEquipments(): CS_Equipments { return this._currentEquipment }
    setAllCurrentEquipments(newCurrentEquipment: CS_Equipments): void {

        this._currentEquipment = newCurrentEquipment
    }

    getCurrentEquipment(equipmentType: CS_EquipmentTypes): CS_EquipmentData { return this._currentEquipment[equipmentType] }
    setCurrentEquipment(equipment: CS_EquipmentData): void {

        this._currentEquipment[equipment.type]

        //@ts-ignore: Read "knowIssues.md"
        this._currentEquipment[equipment.type] = structuredClone(equipment)
    }

    getInventory(): CS_Inventory { return this._inventory }
    setInventory(inventoryObject: CS_Inventory): void {

        this.setAllInventoryEquipments(inventoryObject.equipments)
        this.setInventoryResources(inventoryObject.resources)
    }

    getAllInventoryEquipments(): CS_Inventory_Equipments { return this._inventory.equipments }
    setAllInventoryEquipments(inventoryEquipmentObject: CS_Inventory_Equipments): void {

        EQUIPMENT_TYPES_ARRAY.forEach(type => {
            this.setInventoryEquipments(inventoryEquipmentObject[type])
        })
    }

    getInventoryEquipments(equipmentType: CS_EquipmentTypes): CS_EquipmentInventory_Object { return this._inventory.equipments[equipmentType] }
    setInventoryEquipments(inventoryEquipmentsObject: CS_EquipmentInventory_Object): void {
        
        this._inventory.equipments[inventoryEquipmentsObject.type]

        //@ts-ignore: Read "knowIssues.md"
        this._inventory.equipments[inventoryEquipmentsObject.type] = structuredClone(inventoryEquipmentsObject)
    }

    getInventoryResources(): CS_Inventory_Resources { return this._inventory.resources }
    setInventoryResources(object: CS_Inventory_Resources): void {

        this._inventory.resources = structuredClone(object) 
    }

    getTotalStats(): CS_Stats { return this._totalStats }
    setTotalStats(object: CS_Stats): void {
        
        this._totalStats = structuredClone(object) 
    }

    getBaseStats(): CS_Stats { return this._baseStats }
    setBaseStats(object: CS_Stats): void {

        this._baseStats = structuredClone(object) 
    }

    getEquipmentStats(): CS_Stats { return this._statsFromEquips }
    setEquipmentStats(object: CS_Stats): void {
        
        this._statsFromEquips = structuredClone(object)
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

    addSouls(value: number): void {
        
        const souls = this.getSouls()
        this.setSouls(souls + value)
    }

    decreaseSouls(value: number): void {

        const souls = this.getSouls()

        if(souls - value < 0){
            this.setSouls(0)
            return
        }

        this.setSouls(souls - value)
    }

    addLevel(): void {

        const level = this.getlevel()
        this.setlevel(level + 1)
    }

    addAttributes(attributeType: CS_AttributeTypes): void {
        
        const newAttributes = this.getAttributes()
        newAttributes[attributeType] += 1
        this.setAttributes(newAttributes)
    }

    sortInventoryEquipments(equipmentType: CS_EquipmentTypes): void {
        
        this.getInventoryEquipments(equipmentType).array.sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
    }

    isInventoryEquipmentsTypeEmpty(equipmentType: CS_EquipmentTypes): boolean{

        const equipmentsArray = this.getInventoryEquipments(equipmentType) 
        if(equipmentsArray.array.length > 0){
            return false
        }
        return true
    }

    getEquipmentInventoryAmount(equipmentType: CS_EquipmentTypes): number {

        const equipmentsArray = this.getInventoryEquipments(equipmentType) 
        const amount = equipmentsArray.array.length
        return amount
    }

    isSomethingEquipped(equipmentType: CS_EquipmentTypes): boolean {

        const currentEquipment = this.getCurrentEquipment(equipmentType)
        
        if(currentEquipment.name === "Empty") {
            return false
        }
        return true
    }

    equip(equipmentObject: CS_EquipmentData): void {

        const type = equipmentObject.type
        if(this.isSomethingEquipped(type)) {
            this.unequip(type)
        }
        this.setCurrentEquipment(equipmentObject)
    }

    unequip(equipmentType: CS_EquipmentTypes): void {

        const itemToUnequip = this.getAllCurrentEquipments()[equipmentType]
        this.pushToInventory(itemToUnequip)
        this.setCurrentEquipment({ name: "Empty", type: equipmentType })
        this.sortInventoryEquipments(equipmentType)
    }

    equipFromInventory(itemIndex: number, type: CS_EquipmentTypes): void {

        if(
            itemIndex >= this.getEquipmentInventoryAmount(type) || 
            itemIndex < 0
        ) {
            throw Error(`ERROR: Entity class, "equipFromInventory": itemIndex out of boundaries`)
        }

        const itemToEquip = this.getInventoryEquipments(type).array.splice(itemIndex, 1)[0]        
        this.equip(itemToEquip)
    }

    pushToInventory(equipmentObject: CS_EquipmentData): void {
  
        this._inventory.equipments[equipmentObject.type].array.push(
            //@ts-ignore: Read "knowIssues.md"
            structuredClone(equipmentObject)
        )
    }

    getAllEquipmentInventoryString(equipmentType: CS_EquipmentTypes): string {
        
        let equipment = this.getInventoryEquipments(equipmentType)


        let equipmentListString = ''
        for(let i = 0; i < equipment.array.length; i++) {
            equipmentListString += `| ${i + 1}. ${equipment.array[i]?.name} `
        }
        return equipmentListString
    }

    addResources(resourceObject: CS_ResourceData): void {

        const inventoryResources = this.getInventoryResources()[resourceObject.name]

        inventoryResources
            ? inventoryResources.amount += resourceObject.amount
            : this._inventory.resources[resourceObject.name] = {
                name: resourceObject.name,
                amount: resourceObject.amount,
                type: resourceObject.type
            }
    }

    removeResources(resourceName: string, amount: number): void {
        
        const resource = this.getInventory().resources[resourceName]

        if(!resource) {
            return
        }

        resource.amount -= amount
        if (resource.amount <= 0) {
            delete this.getInventory().resources[resourceName]
        }
    }

    recoverHP(): void {
        
        this.setCurrentHP(this.getTotalStats().hp)
    }

    inflictDamage(value: number): void {

        const currentHP = this.getCurrentHP()
        this.setCurrentHP(currentHP - value)
        
        if(this.getCurrentHP() <= 0){
            this.kill()
        }
    }

    ressurrect(): void {
        
        this.setIsAlive(true)
    }

    kill(): void {
        
        this.setIsAlive(false)
    }

    calculateBaseStats(): void {

        const balanceStatsValues = GAME_BALANCE.STATS_WEIGHT
        const attributes = this.getAttributes()

        this.setBaseStats({
            hp:             attributes.vitality     * balanceStatsValues.HP,
            evasion:        attributes.agility      * balanceStatsValues.EVASION,
            fisicalDamage:  attributes.strenght     * balanceStatsValues.FISICAL_DMG,
            fisicalDefense: attributes.strenght     * balanceStatsValues.FISICAL_DEF,
            magicalDamage:  attributes.intelligence * balanceStatsValues.MAGICAL_DMG,
            magicalDefense: attributes.intelligence * balanceStatsValues.MAGICAL_DEF
        })
    }

    calculateStatsFromEquips(): void {

        this.setEquipmentStats({
            hp:             0,
            evasion:        0,
            fisicalDamage:  0,
            fisicalDefense: 0,
            magicalDamage:  0,
            magicalDefense: 0
        })

        const classesArray = [
            LongRangeWeapon, 
            MeleeWeapon, 
            Helmet, 
            BodyArmor, 
            Gloves, 
            Boots
        ]

        EQUIPMENT_TYPES_ARRAY.forEach((type, index) => {
            this.bonusFromEquippment(classesArray[index], type)
        })
    }

    bonusFromEquippment(EquipmentClass: any , equipmentType: CS_EquipmentTypes): void{

        const currentEquipment = this.getAllCurrentEquipments()

        if(!currentEquipment[equipmentType].name) return
        
        const equipmentInstance: Equipment = new EquipmentClass(currentEquipment[equipmentType])
        const equipMultipliers = equipmentInstance.multipliers
        const statsWeightValues = GAME_BALANCE.STATS_WEIGHT
        const attributes = this.getAttributes()

        const stats = this.getEquipmentStats()

        stats.hp           += attributes.vitality        * equipMultipliers.vitality   * statsWeightValues.HP
        stats.evasion      += attributes.agility         * equipMultipliers.agility    * statsWeightValues.EVASION

        switch (true) {

            case equipmentInstance instanceof Weapon:
                stats.fisicalDamage += attributes.strenght      * equipMultipliers.strenght     * statsWeightValues.FISICAL_DMG
                stats.magicalDamage += attributes.intelligence  * equipMultipliers.intelligence * statsWeightValues.MAGICAL_DMG
                break
            //
                
            case equipmentInstance instanceof Armor:
                stats.fisicalDefense += attributes.strenght     * equipMultipliers.strenght     * statsWeightValues.FISICAL_DEF
                stats.magicalDefense += attributes.intelligence * equipMultipliers.intelligence * statsWeightValues.MAGICAL_DEF
                break
            //
        }
    }

    calculateStats(): void {

        this.calculateBaseStats()
        this.calculateStatsFromEquips()

        const baseStats = this.getBaseStats()
        const equipmentStats = this.getEquipmentStats()

        this.setTotalStats({
            hp:             baseStats.hp               + equipmentStats.hp,
            evasion:        baseStats.evasion          + equipmentStats.evasion,
            fisicalDamage:  baseStats.fisicalDamage    + equipmentStats.fisicalDamage,
            fisicalDefense: baseStats.fisicalDefense   + equipmentStats.fisicalDefense,
            magicalDamage:  baseStats.magicalDamage    + equipmentStats.magicalDamage,
            magicalDefense: baseStats.magicalDefense   + equipmentStats.magicalDefense
        })
    }
}
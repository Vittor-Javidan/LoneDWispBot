import { ENTITY_DEFAULT } from '../Globals/DEFAULT_VALUES/ENTITY_DEFAULT.js'

import { EQUIPMENT_TYPES_ARRAY } from '../Globals/ENTRIES/EQUIPMENTS_ENTRY.js'
import {
    CS_Attributes,
    CS_AttributeTypes,
    CS_BuffData, CS_Catalog_Habilities, CS_EquipmentData,
    CS_EquipmentInventory_Object,
    CS_Equipments,
    CS_EquipmentTypes,
    CS_HabilitiesSlots,
    CS_Inventory,
    CS_Inventory_Equipments,
    CS_Inventory_Resources, CS_ResourceData,
    CS_Stats
} from '../Globals/moduleTypes.js'
import CS_Math from './CS_Math.js'

export default class Entity {

    //=================================================================================================
    // PROPERTIES =====================================================================================
    //=================================================================================================

    private _name: string = ''
    private _isAlive: boolean = ENTITY_DEFAULT.IS_ALIVE
    private _souls: number = ENTITY_DEFAULT.SOULS
    private _level: number = ENTITY_DEFAULT.LEVEL
    private _currentHP: number = ENTITY_DEFAULT.CURRENT_HP
    private _currentMana: number = ENTITY_DEFAULT.CURRENT_MANA
    private _attributes: CS_Attributes = structuredClone(ENTITY_DEFAULT.ATTRIBUTES)
    private _currentEquipment: CS_Equipments = structuredClone(ENTITY_DEFAULT.EQUIPMENT)
    private _currentHabilities: CS_HabilitiesSlots = structuredClone(ENTITY_DEFAULT.HABILITIES)
    private _inventory: CS_Inventory = structuredClone(ENTITY_DEFAULT.INVENTORY)
    private _baseStats: CS_Stats = structuredClone(ENTITY_DEFAULT.EMPTY_STATS)
    private _statsFromArmor: CS_Stats = structuredClone(ENTITY_DEFAULT.EMPTY_STATS)
    private _statsFromMelee: CS_Stats = structuredClone(ENTITY_DEFAULT.EMPTY_STATS)
    private _statsFromLongRange: CS_Stats = structuredClone(ENTITY_DEFAULT.EMPTY_STATS)
    private _statsFromBuffs: CS_Stats = structuredClone(ENTITY_DEFAULT.EMPTY_STATS)
    private _buffs: Record<string, CS_BuffData> = {}

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

    getCurrentMana(): number { return this._currentMana }
    setCurrentMana(value: number): void {
        
        if(value < 0) {
            throw Error('Error: Entity class, mana cannot be negative')
        }

        this._currentMana = value
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

    getCurrentHabilities(): CS_HabilitiesSlots { return this._currentHabilities }
    setCurrentHabilities(habilities: CS_HabilitiesSlots): void {
        
        this._currentHabilities = habilities
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

    getBaseStats(): CS_Stats { return this._baseStats }
    setBaseStats(object: CS_Stats): void {

        this._baseStats = structuredClone(object) 
    }

    getLongRangeStats(): CS_Stats { return this._statsFromLongRange }
    setLongRangeStats(object: CS_Stats): void {
        
        this._statsFromLongRange = structuredClone(object)
    }
    
    getMeleeStats(): CS_Stats { return this._statsFromMelee }
    setMeleeStats(object: CS_Stats): void {
        
        this._statsFromMelee = structuredClone(object)
    }
    
    getArmorStats(): CS_Stats { return this._statsFromArmor }
    setArmorStats(object: CS_Stats): void {
        
        this._statsFromArmor = structuredClone(object)
    }

    getBuffStats(): CS_Stats { return this._statsFromBuffs }
    setBuffStats(object: CS_Stats): void {
        
        this._statsFromBuffs = structuredClone(object)
    }

    getBuffs(): Record<string, CS_BuffData> { return this._buffs }

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
        this.setCurrentEquipment({ name: "Empty", type: equipmentType})
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

    getHabilitsAmount(): number {

        const habilities = this.getHabilitiesNames()
        return habilities.length
    }

    getHabilitiesString(): string {

        const habilities = this.getHabilitiesNames()
        let message = ''

        habilities.forEach((habilitieName, index) => {
            message += `| ${index + 1}. ${habilitieName} `
        })

        if(message === '') {
            return `Sem habilidades equipadas`
        }

        return message
    }

    getHabilitiesNames(): CS_Catalog_Habilities[] {

        const habilities = this.getCurrentHabilities()
        let habilitiesArray: CS_Catalog_Habilities[] = []

        for(const equipmentType in habilities) {

            const habilitieName = habilities[equipmentType as CS_EquipmentTypes].name

            if(habilitieName !== "Empty") {
                habilitiesArray.push(habilitieName)
            }
        }

        return habilitiesArray
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

    recoverHP(value: number | "maxHP"): void {

        const maxHP = this.getBaseStats().hp + this.getArmorStats().hp
        let totalHP = 0

        if (value === "maxHP") {
            totalHP = maxHP
            this.setCurrentHP(totalHP)
            return
        }

        totalHP = this.getCurrentHP() + value
        
        if(totalHP > maxHP) {
            totalHP = maxHP
        } 

        this.setCurrentHP(totalHP)
    }

    recoverMana(): void {

        const totalMana = this.getBaseStats().mana + this.getArmorStats().mana
        this.setCurrentMana(totalMana)
    }

    consumeMana(value: number): void {
        
        const mana = this.getCurrentMana() - value

        if(mana < 0) {
            throw Error(`ERROR: Entity class, "consumeMana": you cannot use more mana than you has!`)
        }

        this.setCurrentMana(mana)
    }

    canSpendManaValue(value: number): boolean {
        return this.getCurrentMana() - value > 0
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
        CS_Math.baseStatsCalculation(this)
    }
    
    calculateStatsFromEquips(): void {
        CS_Math.equipmentStatsCalculation(this)
    }

    calculateStatsFromBuffs(): void {
        CS_Math.buffStatsCalculation(this)
    }

    registerBuff(buff: CS_BuffData): void {
        this._buffs[buff.name] = buff
    }

    deleteBuff(buffName: CS_Catalog_Habilities): void {
        delete this._buffs[buffName]
    }

    deletAllBuffs(): void {
        this._buffs = {}
    }
}
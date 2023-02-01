import { ENTITY_DEFAULT } from '../Globals/ENTITY_DEFAULT.js'
import { GAME_BALANCE } from '../Globals/GAME_BALANCE.js'
import Armor from './Equipments/Armor.js'
import BodyArmor from './Equipments/BodyArmor.js'
import Boots from './Equipments/Boots.js'
import Gloves from './Equipments/Gloves.js'
import Helmet from './Equipments/Helmet.js'
import LongRangeWeapon from './Equipments/LongRangeWeapon.js'
import MeleeWeapon from './Equipments/MeleeWeapon.js'
import Weapon from './Equipments/Weapon.js'

import { EQUIPMENT_TYPES_ARRAY } from '../Globals/EQUIPMENTS_ENTRY.js'
import {
    CS_Armor_Multipliers,
    CS_Attributes,
    CS_AttributeTypes,
    CS_EquipmentData,
    CS_EquipmentInventory_Object,
    CS_Equipments,
    CS_EquipmentTypes,
    CS_Inventory,
    CS_Inventory_Equipments,
    CS_Inventory_Resources, CS_ResourceData,
    CS_Stats,
    CS_Weapon_Multipliers
} from '../Globals/moduleTypes.js'

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
    private _statsFromArmor: CS_Stats = structuredClone(ENTITY_DEFAULT.STATS_FROM_EQUIPS)
    private _statsFromMelee: CS_Stats = structuredClone(ENTITY_DEFAULT.STATS_FROM_EQUIPS)
    private _statsFromLongRange: CS_Stats = structuredClone(ENTITY_DEFAULT.STATS_FROM_EQUIPS)

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

        const totalHP = this.getBaseStats().hp + this.getArmorStats().hp
        this.setCurrentHP(totalHP)
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
            fireDamage:     0,
            iceDamage:      0,
            thunderDamage:  0,
            poisonDamage:   0,

            fisicalDefense: attributes.strenght     * balanceStatsValues.FISICAL_DEF,
            fireDefense:    attributes.intelligence * balanceStatsValues.MAGICAL_DEF,
            iceDefense:     attributes.intelligence * balanceStatsValues.MAGICAL_DEF,
            thunderDefense: attributes.intelligence * balanceStatsValues.MAGICAL_DEF,
            poisonDefense:  attributes.intelligence * balanceStatsValues.MAGICAL_DEF
        })
    }
    
    calculateStatsFromEquips(): void {
        
        const currentEquipment = this.getAllCurrentEquipments()
        const resetedStats: CS_Stats = {

            hp:             0,
            evasion:        0,

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
        }

        this.setLongRangeStats(resetedStats)
        this.setMeleeStats(resetedStats)
        this.setArmorStats(resetedStats)

        let equipmentInstance: Weapon | Armor

        for(let equipmentType in currentEquipment) {    

            switch(equipmentType as CS_EquipmentTypes) {

                case "longRangeWeapon": equipmentInstance = new LongRangeWeapon(currentEquipment["longRangeWeapon"]);break
                case "meleeWeapon":     equipmentInstance = new MeleeWeapon(currentEquipment["meleeWeapon"])        ;break
                case "helmet":          equipmentInstance = new Helmet(currentEquipment["helmet"])                  ;break
                case "bodyArmor":       equipmentInstance = new BodyArmor(currentEquipment["bodyArmor"])            ;break
                case "gloves":          equipmentInstance = new Gloves(currentEquipment["gloves"])                  ;break
                case "boots":           equipmentInstance = new Boots(currentEquipment["boots"])                    ;break

                default: throw Error(`Error: Entity class, "calculateStatsFromEquips": equipment type not recognized`)
            }

            if(equipmentInstance instanceof Armor) {
                this.bonusFromArmor(equipmentInstance)
            }

            if(equipmentInstance instanceof Weapon) {
                this.bonusFromWeapon(equipmentInstance)
            }
        }
    }

    bonusFromArmor(armor: Armor): void{

        const attributes = this.getAttributes()
        const stats = this.getArmorStats()

        let equipMultipliers: CS_Weapon_Multipliers | CS_Armor_Multipliers
        
        equipMultipliers  = armor.multipliers as CS_Armor_Multipliers

        stats.hp             += attributes.vitality       * equipMultipliers.vitality
        stats.evasion        += attributes.agility        * equipMultipliers.agility

        stats.fisicalDefense += attributes.strenght       * equipMultipliers.strenght
        stats.fireDefense    += attributes.intelligence   * equipMultipliers.fireDefense
        stats.iceDefense     += attributes.intelligence   * equipMultipliers.iceDefense
        stats.thunderDefense += attributes.intelligence   * equipMultipliers.thunderDefense
        stats.poisonDefense  += attributes.intelligence   * equipMultipliers.poisonDefense
    }

    bonusFromWeapon(weapon: Weapon): void{

        const attributes = this.getAttributes()
        let equipMultipliers: CS_Weapon_Multipliers | CS_Armor_Multipliers
        let stats: CS_Stats

        weapon instanceof LongRangeWeapon
        ? stats = this.getLongRangeStats()
        : stats = this.getMeleeStats()

        equipMultipliers  = weapon.multipliers as CS_Weapon_Multipliers
        
        stats.fisicalDamage += (
            attributes.agility      * equipMultipliers.agility  +
            attributes.strenght     * equipMultipliers.strenght
        )
        
        stats.fireDamage        += attributes.intelligence  * equipMultipliers.fireDamage
        stats.iceDamage         += attributes.intelligence  * equipMultipliers.iceDamage
        stats.thunderDamage     += attributes.intelligence  * equipMultipliers.thunderDamage
        stats.poisonDamage      += attributes.intelligence  * equipMultipliers.poisonDamage
    }
}
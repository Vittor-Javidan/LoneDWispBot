import { ENTITY_DEFAULT } from "../Globals/DEFAULT_VALUES/ENTITY_DEFAULT.js"
import { GAME_BALANCE } from "../Globals/GAME_BALANCE.js"
import { CS_Armor_Multipliers, CS_BuffData, CS_EquipmentTypes, CS_Stats, CS_Weapon_Multipliers } from "../Globals/moduleTypes.js"
import Entity from "./Entity.js"
import Armor from "./Equipments/Armor.js"
import BodyArmor from "./Equipments/BodyArmor.js"
import Boots from "./Equipments/Boots.js"
import Gloves from "./Equipments/Gloves.js"
import Helmet from "./Equipments/Helmet.js"
import LongRangeWeapon from "./Equipments/LongRangeWeapon.js"
import MeleeWeapon from "./Equipments/MeleeWeapon.js"
import Weapon from "./Equipments/Weapon.js"

export default class CS_Math {
    
    public static getLuckNumber() {
        return Math.floor((Math.random() * 6) + 1)
    }

    public static agilityEventSucced(o: {
        from: Entity,
        against: Entity,
        accuracyWeight: number
    }): boolean {

        const NOT_ZERO = 1
        const { from, against, accuracyWeight: evasionWeight } = o

        let accuracy = from.getBaseStats().accuracy + from.getArmorStats().accuracy + from.getBuffStats().accuracy
        let evasion = against.getBaseStats().evasion + against.getArmorStats().evasion + against.getBuffStats().evasion
        let sumEvasionAccuracy = evasion + accuracy

        if(accuracy < 0) accuracy = 0
        if(evasion < 0) evasion = 0
        if(evasion + accuracy <= 0) {
            sumEvasionAccuracy = NOT_ZERO
        }

        const hitChance = Math.floor((accuracy * evasionWeight) / (sumEvasionAccuracy) * 100) 
        const hitRNG = Math.floor(Math.random() * 100)

        return hitRNG <= hitChance
    }

    public static rawDamage_Melee(attacker: Entity, defender:Entity): number {
        
        const offensiveStats = this.sumStatsObjects([attacker.getBaseStats(), attacker.getMeleeStats()]) 
        const defensiveStats = this.sumStatsObjects([defender.getBaseStats(), defender.getArmorStats()])
        return this.rawDamageReceived(offensiveStats, defensiveStats)
    }

    public static rawDamage_LongRange(attacker: Entity, defender:Entity): number {

        const offensiveStats = this.sumStatsObjects([attacker.getBaseStats(), attacker.getLongRangeStats()])
        const defensiveStats = this.sumStatsObjects([defender.getBaseStats(), defender.getArmorStats()])
        return this.rawDamageReceived(offensiveStats, defensiveStats)
    }

    public static rawDamageReceived(offensiveStats: CS_Stats, defensiveStats: CS_Stats): number {

        const damages = [
            offensiveStats.fisicalDamage,
            offensiveStats.fireDamage,
            offensiveStats.iceDamage,
            offensiveStats.thunderDamage,
            offensiveStats.poisonDamage
        ]

        const defenses = [
            defensiveStats.fisicalDefense,
            defensiveStats.fireDefense,
            defensiveStats.iceDefense,
            defensiveStats.thunderDefense,
            defensiveStats.poisonDefense
        ]

        let totalRawDamage = 0
        damages.forEach((damage, index) => {
            
            let rawDamage = damage - defenses[index] 
            if (rawDamage < 0) {
                rawDamage = 0
            }
            totalRawDamage += rawDamage
        })

        return Math.floor(totalRawDamage)
    }

    public static buffRawDamageCalculation(entity: Entity, buff: CS_BuffData): number {
        
        const entityDefenses = this.sumStatsObjects([entity.getBaseStats(), entity.getArmorStats()])
        return this.rawDamageReceived(buff.buffStats, entityDefenses)
    }

    public static returnEffectiveDamage(damageValue: number): number {

        const luck = this.getLuckNumber()

        if(damageValue < 0) {
            throw Error(`ERROR: damageValue must be a valid and positive number`)
        }

        switch(luck) {
            
            case 1: damageValue = damageValue * 0.5     ;break
            case 2: damageValue = damageValue * 0.75    ;break
            case 3: damageValue = damageValue * 0.9     ;break
            case 4: damageValue = damageValue * 1.1     ;break
            case 5: damageValue = damageValue * 1.25    ;break
            case 6: damageValue = damageValue * 1.5     ;break
        }

        damageValue = Math.floor(damageValue)

        if(damageValue < 1) {
            damageValue = 1
        }

        return damageValue
    }

    public static baseStatsCalculation(entity: Entity) {

        const balanceStatsValues = GAME_BALANCE.STATS_WEIGHT
        const attributes = entity.getAttributes()
        entity.setBaseStats({
            
            hp:             attributes.vitality     * balanceStatsValues.HP,
            mana:           attributes.intelligence * balanceStatsValues.MANA,
            evasion:        attributes.agility      * balanceStatsValues.EVASION,
            accuracy:       attributes.agility      * balanceStatsValues.ACCURACY,

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

    public static equipmentStatsCalculation(entity: Entity) {
        
        entity.setLongRangeStats(ENTITY_DEFAULT.EMPTY_STATS)
        entity.setMeleeStats(ENTITY_DEFAULT.EMPTY_STATS)
        entity.setArmorStats(ENTITY_DEFAULT.EMPTY_STATS)

        const currentEquipment = entity.getAllCurrentEquipments()

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
                this.bonusFromArmor(entity, equipmentInstance)
            }

            if(equipmentInstance instanceof Weapon) {
                this.bonusFromWeapon(entity, equipmentInstance)
            }
        }
    }

    private static bonusFromArmor(entity: Entity, armor: Armor): void{

        const attributes = entity.getAttributes()
        const stats = entity.getArmorStats()

        let equipMultipliers: CS_Weapon_Multipliers | CS_Armor_Multipliers
        
        equipMultipliers  = armor.multipliers as CS_Armor_Multipliers

        stats.hp             += attributes.vitality       * equipMultipliers.vitality
        stats.mana           += attributes.intelligence   * equipMultipliers.mana
        stats.evasion        += attributes.agility        * equipMultipliers.agility
        stats.accuracy       += attributes.agility        * equipMultipliers.agility

        stats.fisicalDefense += attributes.strenght       * equipMultipliers.strenght
        stats.fireDefense    += attributes.intelligence   * equipMultipliers.fireDefense
        stats.iceDefense     += attributes.intelligence   * equipMultipliers.iceDefense
        stats.thunderDefense += attributes.intelligence   * equipMultipliers.thunderDefense
        stats.poisonDefense  += attributes.intelligence   * equipMultipliers.poisonDefense
    }

    private static bonusFromWeapon(entity: Entity, weapon: Weapon): void{

        const attributes = entity.getAttributes()
        let equipMultipliers: CS_Weapon_Multipliers | CS_Armor_Multipliers
        let stats: CS_Stats

        weapon instanceof LongRangeWeapon
        ? stats = entity.getLongRangeStats()
        : stats = entity.getMeleeStats()

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

    static buffStatsCalculation(entity: Entity) {
        
        const entityBuffs = Object.values(entity.getBuffs())
        
        let newBuffStats = structuredClone(ENTITY_DEFAULT.EMPTY_STATS)

        entityBuffs.forEach(buff => {

            if(buff.type === 'Buff/Debuff') {
                
                newBuffStats = (CS_Math.sumStatsObjects([
                    newBuffStats, 
                    buff.buffStats
                ]))
            }
        }) 

        entity.setBuffStats(newBuffStats)
    }

    static sumStatsObjects(statsArray: CS_Stats[]): CS_Stats {

        const newObject = structuredClone(ENTITY_DEFAULT.EMPTY_STATS)
        
        for (let i = 0; i < statsArray.length; i++) { 

            const stats = statsArray[i];

            for(const key  in stats) {
                newObject[key as keyof CS_Stats] += stats[key as keyof CS_Stats]
            }
        }

        return newObject
    }
}
import { enemiesDataBase } from '../../database/enemies/enemiesData.js'
import { CS_Catalog_Habilities, CS_EntityData } from '../../Globals/moduleTypes.js'
import Entity from '../Entity.js'
import Player from './Player.js'

export default class Enemie extends Entity{

    constructor(enemieData: CS_EntityData) {

        super(enemieData.name)
        this.setSouls(enemieData.souls)
        this.setlevel(enemieData.level)
        this.setAttributes(enemieData.attributes)
        this.setAllCurrentEquipments(enemieData.equipment)
        this.setInventory(enemieData.inventory)
    }

    static initialize(enemieData: CS_EntityData): Enemie{

        const enemie = new Enemie(enemieData)
        enemie.calculateBaseStats()
        enemie.calculateStatsFromEquips()
        enemie.recoverHP("maxHP")
        
        return enemie
    }

    static instantiateRandomEnemie(player: Player): Enemie {
        
        const possibleEnemies = this.getPossibleEnemies(player)
        const randomIndex = Math.floor(Math.random() * possibleEnemies.length);
        const randomEnemieData = possibleEnemies[randomIndex];
        const enemie = Enemie.initialize(randomEnemieData)

        return enemie
    }

    static getPossibleEnemies(player: Player): CS_EntityData[]{

        const playerLocation = player.getCurrentLocation()
        const playerLevel = player.getlevel()
        const areaEnemies = enemiesDataBase[playerLocation]
        const enemiesArray = Object.values(areaEnemies)
        const possibleEnemies: CS_EntityData[] = []
        
        enemiesArray.forEach(enemieData => {
            if (playerLevel >= enemieData.level) {
                possibleEnemies.push(enemieData)
            }
        })
        
        return possibleEnemies
    }

    /**
     * Determines the weapon or ability to be used by an enemy.
     * 
     * The function first calculates the chance to use an ability. If this fails,
     * it then calculates the chance for each weapon to be used.
     * 
     * - Chose a number between 1 to 100 for each option.
     * - castChance - The probability that the enemy will use an ability instead of a weapon.
     * - weaponChance: The probability that the enemy will use a melee weapon instead of a long-range weapon.
     * - If enemie has no weapons, `"Melee"` will return.
     * - If enemie has only melee, or only LongRange, it will return the one that is equiped.
     * - If enemie has no habilities, it will ignore the habilitie probabilitie.
     */
    randomAction(config: {
        castChance: number,
        weaponChance: number
    }): "Melee" | "LongRange" | "Habilitie" {

        const {castChance, weaponChance} = config
        const meleeWeapon = this.getCurrentEquipment("meleeWeapon")
        const longRangeWeapon = this.getCurrentEquipment("longRangeWeapon")

        let rngChance = Math.floor(Math.random() * 100) + 1

        if(rngChance <= castChance && this.doHaveAnyHabilitie()) {
            return "Habilitie"
        }

        rngChance = Math.floor(Math.random() * 100) + 1

        if(meleeWeapon.name !== "Empty" && longRangeWeapon.name !== "Empty") {

            if(rngChance <= weaponChance){
                return "Melee"
            } else {
                return "LongRange"
            }
        }

        if(longRangeWeapon.name !== 'Empty') {
            return "LongRange"
        } else {
            return "Melee"
        }
    }

    doHaveAnyHabilitie(): boolean {

        let answer = false
        
        const enemiesHabilities = Object.values(this.getCurrentHabilities())
        
        enemiesHabilities.forEach(habilitieData => {
            if(habilitieData.name !== "Empty") {
                answer = true
            }
        })

        return answer
    }

    chooseRandomHabilitie(): CS_Catalog_Habilities {

        const enemiesHabilities = Object.values(this.getCurrentHabilities())

        if(enemiesHabilities.length === 0) {
            throw Error(`ERROR: Enemie class, "chooseRandomHabilitie": no habilitie available`)
        }

        const indexRNG = Math.floor(Math.random() * enemiesHabilities.length)
        return enemiesHabilities[indexRNG].name
    }
}
import { enemiesDataBase } from '../../database/enemies/enemiesData.js'
import { CS_EntityData } from '../../Types/moduleTypes.js'
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
        enemie.calculateStats()
        enemie.recoverHP()
        
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
}
import { CS_ResourceData } from '../Types/moduleTypes.js';
import Entity from './Entity.js';
import Enemie from './EntityChilds/Enemie.js';
import Player from './EntityChilds/Player.js';

export default class Battle {

    static battlesList: Record<string, Battle> = {}

    playerInstance: Player
    enemieInstance: Enemie
    earnedResources: CS_ResourceData[] = []
    turn: 1 | 2 | undefined = undefined

    constructor(player: Player, enemie: Enemie){
        
        this.playerInstance = player
        this.enemieInstance = enemie
    }

    //=================================================================================================
    // CLASS METHODS ==================================================================================
    //=================================================================================================

    static startBattle(player: Player, enemie: Enemie): Battle {
        
        const battleInstance = new Battle(player, enemie)
        battleInstance.determineFirstTurn()
        battleInstance.registerBattle()
        return battleInstance
    }
    
    static getBattleByName(userName: string): Battle {

        const battle = this.battlesList[userName]

        if(!battle) {
            throw Error(`ERROR: Battle class, "getBattle": Battle doesn't exist`)
        }

        return battle
    }
    
    static deleteBattle(userName: string): void {

        delete this.battlesList[userName]
    }

    static doesBattleExist(userName: string): boolean{

        const battle = this.battlesList[userName]

        if(battle) {
            return true
        }
        return false
    }

    static returnStringWithAllBattles(): string {

        const battlesList = this.battlesList
        const playersOnBattle = Object.keys(battlesList)
        let message = 'Jogadores em batalha nesse momento: '

        if(playersOnBattle.length === 0){
            message += '| Nenhum |'
            return message
        }
        
        for(const player in battlesList) {

            const battle = battlesList[player]
            const playerString = battle.getPlayerStatus()
            const enemieString = battle.getEnemieStatus()
            message += `| ${playerString} vs ${enemieString} `
        }
        
        message += "|"
        return message
    }

    static calculateRawDamage(object: {
        attacker: Entity,
        defender: Entity
    }): number {

        const attacker_fisicalDmg = object.attacker.getTotalStats().fisicalDamage
        const defender_fisicalDef = object.defender.getTotalStats().fisicalDefense
        let rawDamage = attacker_fisicalDmg - defender_fisicalDef
        if (rawDamage < 1) {
            rawDamage = 1
        }
        return Math.floor(rawDamage)
    }

    static returnEffectiveDamage(damageValue: number, luck: number): number {

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

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

    determineFirstTurn(): void {

        const playerInstance = this.playerInstance
        const enemieInstance = this.enemieInstance
        this.evasionEventSucced({
            from: playerInstance, 
            against: enemieInstance, 
            evasionWeight: 1
        }) ? this.turn = 1 : this.turn = 2
    }

    registerBattle(): void {
        Battle.battlesList[this.playerInstance.getName()] = this
    }

    isBothAlive(): boolean {
        return this.playerInstance.getIsAlive() && this.enemieInstance.getIsAlive()
    }

    calculateRewards(): void {
        
        const resources = this.enemieInstance.getInventoryResources()
        const resourceKeys = Object.keys(resources)

        resourceKeys.forEach(resourceName => {

            const resourceData = resources[resourceName]
            const randomNumber = Math.random()
            this.calculateLoot(resourceData, randomNumber)
        })
        
        this.playerInstance.addSouls(this.enemieInstance.getSouls())
    }

    calculateLoot(resources: CS_ResourceData, randomNumber: number): void {

        if(!resources.dropChance) {
            throw Error(`ERROR: Battle Class, "calculateLoot": Enemie resource without dropchance`)
        }
        
        if(resources.dropChance >= randomNumber) {
            const newResourceObject = {
                name: resources.name,
                amount: resources.amount,
                type: resources.type
            }
            this.playerInstance.addResources(newResourceObject)
            this.earnedResources.push(structuredClone(newResourceObject))
        }
    }

    returnResourcesRewardsString(): string {

        let message = `Recursos ganhos: `

        if(this.earnedResources.length <= 0) {
            message += `nenhum :(`
        }

        for(let i = 0; i < this.earnedResources.length; i++) {

            const earnedResource = this.earnedResources[i]
            const amount = earnedResource.amount
            const resourceName = earnedResource.name
            message += `${amount}x ${resourceName}, `
        }

        return message.slice(0, -2)
    }

    evasionEventSucced(o: {
        from: Player | Enemie,
        against: Player | Enemie,
        evasionWeight: number
    }): boolean {

        const { from, against, evasionWeight } = o
        const evasion = from.getTotalStats().evasion
        const oponent_evasion = against.getTotalStats().evasion

        let sharedEvasion = oponent_evasion + evasion

        if(sharedEvasion <= 0) {

            sharedEvasion = 100 
            
            /* =======================================
            Anything other that zero is fine, to avoid
            division by zero. " sharedEvasion = 100 "
            just makes this method easier to unit test.
            ======================================= */
        }

        const evasionChance = (evasion * evasionWeight) / (sharedEvasion)
        const randomNumber = Math.random()

        if(evasionChance >= randomNumber) {
            return true
        }
        return false
    }

    /**
     * Returns a string with Player 
     * current HP and Enemie current 
     * HP already formatted.
     */
    getBattleStatus(): string {
        return `| ${this.getPlayerStatus()} | ${this.getEnemieStatus()}`
    }

    /**
     * Returns a string with Player 
     * current and max HP already 
     * formatted.
     */
    getPlayerStatus(): string {
        
        const playerName = this.playerInstance.getName()
        const playerHP = this.playerInstance.getCurrentHP()
        const playerMaxHP = this.playerInstance.getTotalStats().hp
        const playerHPString = `${playerName}: ${playerHP}/${playerMaxHP} HP`

        return `${playerHPString}`
    }

    /**
     * Returns a string with Enemie 
     * current and max HP already 
     * formatted.
     */
    getEnemieStatus(): string {
        
        const enemieName = this.enemieInstance.getName()
        const enemieHP = this.enemieInstance.getCurrentHP()
        const enemieMaxHP = this.enemieInstance.getTotalStats().hp
        const enemieHPString = `${enemieName}: ${enemieHP}/${enemieMaxHP} HP`

        return `${enemieHPString}`
    }
}

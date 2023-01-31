import { CS_ResourceData } from '../Globals/moduleTypes.js';
import Enemie from './EntityChilds/Enemie.js';
import Player from './EntityChilds/Player.js';
import SendMessage_UI from './SendMessage.js';


const PLAYER_TURN = 1
const config = {
    ATTACK: {
        EVASION_WEIGHT: 1
    },
    FLEE: {
        EVASION_WEIGHT: 1
    }
}

export default class Battle {


    private static _battlesList: Record<string, Battle> = {}
    private _player: Player
    private _enemie: Enemie
    
    private _turn: 1 | 2 | undefined = undefined
    
    private _earnedResources: CS_ResourceData[] = []
    
    private _status = {
        playerDamage: 0,
        enemieDamage: 0,
        playerHit: false,
        enemieHit: false,
        playerDied: false,
        enemieDied: false
    }

    private constructor(player: Player, enemie: Enemie){
        
        this._player = player
        this._enemie = enemie
    }

    //=================================================================================================
    // PUBLIC METHODS =================================================================================
    //=================================================================================================

    public attack() {

        if(this._turn === PLAYER_TURN) {

            this.playerRound()
            this.enemieRound()

        } else {
            
            this.enemieRound()
            this.playerRound()
        }

        this.chooseBattleMessage()
    }

    public getBattleStatusString(): string {
        return `| ${this.getPlayerStatus()} | ${this.getEnemieStatus()}`
    }

    public getTurn(): number | undefined {
        
        return this._turn
    }

    public getEnemie(): Enemie {
        return this._enemie
    }

    public getPlayer(): Player {
        return this._player
    }
    
    //=================================================================================================
    // PUBLIC STATIC METHODS ==========================================================================
    //=================================================================================================

    public static startBattle(player: Player, enemie: Enemie): Battle {
        
        const battleInstance = new Battle(player, enemie)
        battleInstance.determineFirstTurn()
        battleInstance.registerBattle()
        return battleInstance
    }
    
    public static getBattleByName(userName: string): Battle {

        const battle = this._battlesList[userName]

        if(!battle) {
            throw Error(`ERROR: Battle class, "getBattle": Battle doesn't exist`)
        }

        return battle
    }
    
    public static doesBattleExist(userName: string): boolean{

        const battle = this._battlesList[userName]

        if(battle) {
            return true
        }
        return false
    }
    
    public static deleteBattle(userName: string): void {

        delete this._battlesList[userName]
    }


    public static returnStringWithAllBattles(): string {

        const battlesList = this._battlesList
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

    //=================================================================================================
    // PRIVATE METHODS ===============================================================================
    //=================================================================================================
    
    private static calculateRawDamage(object: {
        attacker: Player | Enemie,
        defender: Player | Enemie
    }): number {

        const attacker_fisicalDmg = object.attacker.getTotalStats().fisicalDamage
        const defender_fisicalDef = object.defender.getTotalStats().fisicalDefense
        let rawDamage = attacker_fisicalDmg - defender_fisicalDef
        if (rawDamage < 1) {
            rawDamage = 1
        }
        return Math.floor(rawDamage)
    }

    private static returnEffectiveDamage(damageValue: number, luck: number): number {

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

    private determineFirstTurn(): void {

        const playerInstance = this._player
        const enemieInstance = this._enemie
        this.evasionEventSucced({
            from: playerInstance, 
            against: enemieInstance, 
            evasionWeight: 1
        }) ? this._turn = 1 : this._turn = 2
    }

    private registerBattle(): void {
        Battle._battlesList[this._player.getName()] = this
    }

    private isBothAlive(): boolean {
        return !this._status.playerDied && !this._status.enemieDied
    }

    private calculateRewards(): void {
        
        const resources = this._enemie.getInventoryResources()
        const resourceKeys = Object.keys(resources)

        resourceKeys.forEach(resourceName => {

            const resourceData = resources[resourceName]
            const randomNumber = Math.random()
            this.calculateLoot(resourceData, randomNumber)
        })
        
        this._player.addSouls(this._enemie.getSouls())
    }

    private calculateLoot(resources: CS_ResourceData, randomNumber: number): void {

        if(!resources.dropChance) {
            throw Error(`ERROR: Battle Class, "calculateLoot": Enemie resource without dropchance`)
        }
        
        if(resources.dropChance >= randomNumber) {
            const newResourceObject = {
                name: resources.name,
                amount: resources.amount,
                type: resources.type
            }
            this._player.addResources(newResourceObject)
            this._earnedResources.push(structuredClone(newResourceObject))
        }
    }

    private returnResourcesRewardsString(): string {

        let message = `Recursos ganhos: `

        if(this._earnedResources.length <= 0) {
            message += `nenhum :(`
        }

        for(let i = 0; i < this._earnedResources.length; i++) {

            const earnedResource = this._earnedResources[i]
            const amount = earnedResource.amount
            const resourceName = earnedResource.name
            message += `${amount}x ${resourceName}, `
        }

        return message.slice(0, -2)
    }

    private evasionEventSucced(o: {
        from: Player | Enemie,
        against: Player | Enemie,
        evasionWeight: number
    }): boolean {

        const NOT_ZERO = 100 // Easy value to unit test
        const { from, against, evasionWeight } = o

        const evasion = from.getTotalStats().evasion
        const oponent_evasion = against.getTotalStats().evasion

        let sharedEvasion = oponent_evasion + evasion

        if(sharedEvasion <= 0) {
            sharedEvasion = NOT_ZERO
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
     * current and max HP already 
     * formatted.
     */
    private getPlayerStatus(): string {
        
        const playerName = this._player.getName()
        const playerHP = this._player.getCurrentHP()
        const playerMaxHP = this._player.getTotalStats().hp
        const playerHPString = `${playerName}: ${playerHP}/${playerMaxHP} HP`

        return `${playerHPString}`
    }

    /**
     * Returns a string with Enemie 
     * current and max HP already 
     * formatted.
     */
    private getEnemieStatus(): string {
        
        const enemieName = this._enemie.getName()
        const enemieHP = this._enemie.getCurrentHP()
        const enemieMaxHP = this._enemie.getTotalStats().hp
        const enemieHPString = `${enemieName}: ${enemieHP}/${enemieMaxHP} HP`

        return `${enemieHPString}`
    }

    private playerRound() {

        const battleStatus = this._status

        if(!battleStatus.playerDied) {
            this.attackAttempt('Player')
        }

        if(battleStatus.enemieDied) { 
            this.playerWon()
        }
    }

    private enemieRound() {

        const battleStatus = this._status

        if(!battleStatus.enemieDied) {
            this.attackAttempt('Enemie') 
        }

        if(battleStatus.playerDied) {
            this.playerDied()
        }
    }
    
    private attackAttempt(agressor: "Player" | "Enemie") {
    
        let attacker: Player | Enemie
        let defensor: Player | Enemie

        if (agressor === "Player") {
            attacker = this._player
            defensor = this._enemie
        } else {
            attacker = this._enemie
            defensor = this._player
        }
    
        if(this.evasionEventSucced({
            from: defensor,
            against: attacker,
            evasionWeight: config.ATTACK.EVASION_WEIGHT
        })) {
            this.logHitResults(attacker, false)
            return
        }
        
        this.calculateDamage({
            attacker: attacker,
            defensor: defensor
        })
    }

    private playerWon(): void {

        const player = this._player
        
        this.calculateRewards()
        player.save()
        player.setCurrentState({
            primary: "EXPLORING",
            secondary: "IDLE"
        })
        
        this.battleEnds()
    }

    private playerDied(): void {

        const player = this._player
    
        player.setSouls(0)
        player.recoverHP()
        player.ressurrect()
        player.save()
        player.setCurrentState({
            primary: "FIRE_PIT",
            secondary: "RESTING_ON_FIRE_PIT"
        })
        
        this.battleEnds()
    }

    private battleEnds(): void {

        if(this.isBothAlive()) {
            return
        }
        
        Battle.deleteBattle(this._player.getName())
    }

    private calculateDamage(o: {
        attacker: Player | Enemie,
        defensor: Player | Enemie
    }): void {
        
        const { attacker, defensor } = o
        
        const rawDamage = Battle.calculateRawDamage({
            attacker: attacker,
            defender: defensor
        })
        
        const luck = Math.floor((Math.random() * 6) + 1)
        const effectiveDamage = Battle.returnEffectiveDamage(rawDamage, luck)
        defensor.inflictDamage(effectiveDamage)
    
        this.logDamageResults(attacker, effectiveDamage)
        this.logHitResults(attacker, true)
    }

    private logDamageResults(attacker: Player | Enemie, damageValue: number): void {

        attacker instanceof Player
        ? this._status.playerDamage = damageValue
        : this._status.enemieDamage = damageValue
    
        if(!this._player.getIsAlive()) this._status.playerDied = true
        if(!this._enemie.getIsAlive()) this._status.enemieDied = true
    }

    private logHitResults(attacker: Player | Enemie, didHit: boolean): void {

        if(didHit) {
    
            attacker instanceof Player
            ? this._status.playerHit = true
            : this._status.enemieHit = true
    
            return
        }
        
        attacker instanceof Player
        ? this._status.playerHit = false
        : this._status.enemieHit = false
    }    

    private resetBattleLog() {

        this._status = {
            playerDamage: 0,
            enemieDamage: 0,
            playerHit: false,
            enemieHit: false,
            playerDied: false,
            enemieDied: false
        }
    }

    private chooseBattleMessage(): void {

        const player = this._player
        const enemie = this._enemie
    
        const {
            playerHit,
            enemieHit,
            playerDamage,
            enemieDamage,
            playerDied,
            enemieDied
        } = this._status
    
        //=============================
        // NO DAMAGE POSSIBILITIES ====
        //=============================
    
        if(//Both miss
            !playerHit && !enemieHit &&
            !playerDied && !enemieDied
        ) {
            
            SendMessage_UI.battle(this, `
                UUUUUUUUUUUUUUUUUUUUU ambos erraram o ataque
            `)
            this.resetBattleLog()
            return
        }
    
        //=============================
        // DAMAGE POSSIBILITIES =======
        //=============================
    
        if(//Both hit
            playerHit && enemieHit &&
            !playerDied && !enemieDied
        ) {
            SendMessage_UI.battle(this, `
                Ambos se acertaram! você causou ${playerDamage} de dano,
                e sofreu ${enemieDamage} de dano.
            `)
            this.resetBattleLog()
            return
        }
    
        if(//Player Miss, enemie hits
            !playerHit && enemieHit &&
            !playerDied && !enemieDied
        ) {
            SendMessage_UI.battle(this, `
                OUUCH, você errou o ataque e tomou  ${enemieDamage} de dano!!!
            `)
            this.resetBattleLog()
            return
        }
    
        if(//Enemie hit, player miss
            playerHit && !enemieHit &&
            !playerDied && !enemieDied
        ) {
            SendMessage_UI.battle(this, `
                Conseguiu se esquivar e causar ${playerDamage} de dano!!!
            `)
            this.resetBattleLog()
            return
        }
    
        //=============================
        // DEATH POSSIBILITIES ========
        //=============================
    
        if(//Both Hit, player dies
            playerHit && enemieHit &&
            playerDied && !enemieDied
        ) {
            SendMessage_UI.firePit(player, `
                RIP. Ambos se acertaram mas você morreu com ${enemieDamage} de dano.
            `)
            this.resetBattleLog()
            return
        }
        
        if(//Both hit, enemie dies
            playerHit && enemieHit &&
            !playerDied && enemieDied
        ) {
            SendMessage_UI.idle(player, `
                VITÓRIA!! Você sofreu ${enemieDamage} de dano mas venceu!!!
            `)
            this.resetBattleLog()
            return
        }
        
        if(//Player hit and kill enemie
            playerHit && !enemieHit &&
            !playerDied && enemieDied
        ) {
            SendMessage_UI.idle(player, `
                VITÓRIA!! Você conseguiu matar ${enemie.getName()} conectando uma esquiva!!!
            `)
            this.resetBattleLog()
            return
        }
    
        if(//Enemie hit and kills player
            !playerHit && enemieHit &&
            playerDied && !enemieDied
        ) {
            SendMessage_UI.firePit(player, `
                RIP, você errou o ataque e morreu com ${enemieDamage} de dano!!!
            `)
            this.resetBattleLog()
            return
        }
    
        throw Error(`ERROR: attack(), sendUIMessage: possibilitie not consider.
            playerDamage: ${playerDamage},
            enemieDamage: ${enemieDamage},
            playerHit: ${playerHit},
            enemieHit: ${enemieHit},
            playerDied: ${playerDied},
            enemieDied: ${enemieDied}
        `)
    }
}

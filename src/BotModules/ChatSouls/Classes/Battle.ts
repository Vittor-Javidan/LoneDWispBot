import { CS_ResourceData } from '../Globals/moduleTypes.js';
import Enemie from './EntityChilds/Enemie.js';
import Player from './EntityChilds/Player.js';
import SendMessage_UI from './SendMessage.js';

const config = {
    ATTACK: {
        EVASION_WEIGHT: 1
    },
    FLEE: {
        EVASION_WEIGHT: 1
    }
}

export default class Battle {

    private static PLAYER_TURN = 1
    private static battlesList: Record<string, Battle> = {}

    private playerInstance: Player
    private enemieInstance: Enemie
    
    private turn: 1 | 2 | undefined = undefined
    
    private earnedResources: CS_ResourceData[] = []
    
    private status = {
        playerDamage: 0,
        enemieDamage: 0,
        playerHit: false,
        enemieHit: false,
        playerDied: false,
        enemieDied: false
    }

    private constructor(player: Player, enemie: Enemie){
        
        this.playerInstance = player
        this.enemieInstance = enemie
    }

    //=================================================================================================
    // PUBLIC METHODS =================================================================================
    //=================================================================================================

    public attack() {

        if(this.turn === Battle.PLAYER_TURN) {

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
        
        return this.turn
    }

    public getEnemie(): Enemie {
        return this.enemieInstance
    }

    public getPlayer(): Player {
        return this.playerInstance
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

        const battle = this.battlesList[userName]

        if(!battle) {
            throw Error(`ERROR: Battle class, "getBattle": Battle doesn't exist`)
        }

        return battle
    }
    
    public static doesBattleExist(userName: string): boolean{

        const battle = this.battlesList[userName]

        if(battle) {
            return true
        }
        return false
    }
    
    public static deleteBattle(userName: string): void {

        delete this.battlesList[userName]
    }


    public static returnStringWithAllBattles(): string {

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

        const playerInstance = this.playerInstance
        const enemieInstance = this.enemieInstance
        this.evasionEventSucced({
            from: playerInstance, 
            against: enemieInstance, 
            evasionWeight: 1
        }) ? this.turn = 1 : this.turn = 2
    }

    private registerBattle(): void {
        Battle.battlesList[this.playerInstance.getName()] = this
    }

    private isBothAlive(): boolean {
        return !this.status.playerDied && !this.status.enemieDied
    }

    private calculateRewards(): void {
        
        const resources = this.enemieInstance.getInventoryResources()
        const resourceKeys = Object.keys(resources)

        resourceKeys.forEach(resourceName => {

            const resourceData = resources[resourceName]
            const randomNumber = Math.random()
            this.calculateLoot(resourceData, randomNumber)
        })
        
        this.playerInstance.addSouls(this.enemieInstance.getSouls())
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
            this.playerInstance.addResources(newResourceObject)
            this.earnedResources.push(structuredClone(newResourceObject))
        }
    }

    private returnResourcesRewardsString(): string {

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
    private getEnemieStatus(): string {
        
        const enemieName = this.enemieInstance.getName()
        const enemieHP = this.enemieInstance.getCurrentHP()
        const enemieMaxHP = this.enemieInstance.getTotalStats().hp
        const enemieHPString = `${enemieName}: ${enemieHP}/${enemieMaxHP} HP`

        return `${enemieHPString}`
    }

    private playerRound() {

        const battleStatus = this.status

        if(!battleStatus.playerDied) {
            this.attackAttempt('Player')
        }

        if(battleStatus.enemieDied) { 
            this.playerWon()
        }
    }

    private enemieRound() {

        const battleStatus = this.status

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
            attacker = this.playerInstance
            defensor = this.enemieInstance
        } else {
            attacker = this.enemieInstance
            defensor = this.playerInstance
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

        const player = this.playerInstance
        
        this.calculateRewards()
        player.save()
        player.setCurrentState({
            primary: "EXPLORING",
            secondary: "IDLE"
        })
        
        this.battleEnds()
    }

    private playerDied(): void {

        const player = this.playerInstance
    
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
        
        Battle.deleteBattle(this.playerInstance.getName())
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
        ? this.status.playerDamage = damageValue
        : this.status.enemieDamage = damageValue
    
        if(!this.playerInstance.getIsAlive()) this.status.playerDied = true
        if(!this.enemieInstance.getIsAlive()) this.status.enemieDied = true
    }

    private logHitResults(attacker: Player | Enemie, didHit: boolean): void {

        if(didHit) {
    
            attacker instanceof Player
            ? this.status.playerHit = true
            : this.status.enemieHit = true
    
            return
        }
        
        attacker instanceof Player
        ? this.status.playerHit = false
        : this.status.enemieHit = false
    }    

    private resetBattleLog() {

        this.status = {
            playerDamage: 0,
            enemieDamage: 0,
            playerHit: false,
            enemieHit: false,
            playerDied: false,
            enemieDied: false
        }
    }

    private chooseBattleMessage(): void {

        const player = this.playerInstance
        const enemie = this.enemieInstance
    
        const {
            playerHit,
            enemieHit,
            playerDamage,
            enemieDamage,
            playerDied,
            enemieDied
        } = this.status
    
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

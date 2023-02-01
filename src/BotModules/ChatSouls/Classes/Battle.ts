import sendMessage from '../../../Twitch/sendMessageHandler.js';
import { CS_ResourceData } from '../Globals/moduleTypes.js';
import Enemie from './EntityChilds/Enemie.js';
import Player from './EntityChilds/Player.js';
import SendMessage_UI from './SendMessage.js';
import Travel from './Travel.js';


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
    private _BattleStatus = new _BattleStatus()

    private constructor(player: Player, enemie: Enemie){
        
        this._player = player
        this._enemie = enemie
    }

    //=================================================================================================
    // PUBLIC METHODS =================================================================================
    //=================================================================================================

    public attackLongRange() {
        this.attack("LongRange")
    }

    public attackMelee() {
        this.attack("Melee")
    }

    public flee() {

        if(this.evasionEventSucced({
            from: this._player,
            against: this._enemie,
            evasionWeight: 1.5
        })) {
            this._BattleStatus.logFlee(true)
            Battle.deleteBattle(this._player.getName())
            Travel.to_Explore(this._player, `Você conseguiu fugir com sucesso!!!`)
            return
        }

        this.attackAttempt('Enemie', this.decideEnemieWeapon())

        if(this._BattleStatus.getStatus().playerDied) {
            this.playerDied()
        }

        this._BattleStatus.logFlee(false)
        _BattleMessage.chooseBattleMessage(this)
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

    public getStatus() {
        return this._BattleStatus
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

    public returnResourcesRewardsString(): string {

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

    //=================================================================================================
    // PRIVATE METHODS ===============================================================================
    //=================================================================================================

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

    private evasionEventSucced(o: {
        from: Player | Enemie,
        against: Player | Enemie,
        evasionWeight: number
    }): boolean {

        const NOT_ZERO = 100 // Easy value to unit test
        const { from, against, evasionWeight } = o

        const evasion = from.getBaseStats().evasion + from.getArmorStats().evasion
        const oponent_evasion = against.getBaseStats().evasion + against.getArmorStats().evasion 

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
        const playerMaxHP = this._player.getBaseStats().hp + this._player.getArmorStats().hp
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
        const enemieMaxHP = this._enemie.getBaseStats().hp + this._enemie.getArmorStats().hp
        const enemieHPString = `${enemieName}: ${enemieHP}/${enemieMaxHP} HP`

        return `${enemieHPString}`
    }

    private playerRound(attackType: "Melee" | "LongRange") {

        const battleStatus = this._BattleStatus.getStatus()

        if(!battleStatus.playerDied) {
            this.attackAttempt('Player', attackType)
        }

        if(battleStatus.enemieDied) { 
            this.playerWon()
        }
    }

    private enemieRound(attackType: "Melee" | "LongRange") {

        const battleStatus = this._BattleStatus.getStatus()

        if(!battleStatus.enemieDied) {
            this.attackAttempt('Enemie', attackType) 
        }

        if(battleStatus.playerDied) {
            this.playerDied()
        }
    }

    private decideEnemieWeapon(): "Melee" | "LongRange" {

        const enemieEquipment = this._enemie.getAllCurrentEquipments()
        const enemieMelee = enemieEquipment["meleeWeapon"]
        const enemieLongRange = enemieEquipment["longRangeWeapon"]
        
        switch (true) {
            case enemieMelee.name !== "Empty" && enemieLongRange.name !== "Empty":
                const randomNumber = Math.floor(Math.random() * 2)
                if(randomNumber === 1){
                    return "Melee"
                } else {
                    return "LongRange"
                }
            
            case enemieMelee.name !== 'Empty':
                return "Melee"
            case enemieLongRange.name !== "Empty":
                return "LongRange"
            
            default: return "Melee"
        }
    }

    private attack(attackType: "Melee" | "LongRange") {

        if(this._turn === PLAYER_TURN) {

            this.playerRound(attackType)
            this.enemieRound(attackType)

        } else {
            
            this.enemieRound(attackType)
            this.playerRound(attackType)
        }

        _BattleMessage.chooseBattleMessage(this)
    }
    
    private attackAttempt(agressor: "Player" | "Enemie", attackType: "Melee" | "LongRange") {
    
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
            this._BattleStatus.logHitResults(attacker, false)
            return
        }
        
        agressor === "Player"
        ? this.causeDamage("Enemie", attackType)
        : this.causeDamage("Player", attackType)
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

        sendMessage(`
            O Jogador @${player.getName()} MORREU!! 
            ${player.getSouls()} almas foram perdidas *-*.
        `)
    
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

        if(this._BattleStatus.isBothAlive()) {
            return
        }
        
        Battle.deleteBattle(this._player.getName())
    }

    private causeDamage(against: "Player" | "Enemie", attackType: "Melee" | "LongRange"): void {
        
        let attacker: Player | Enemie
        let defensor: Player | Enemie

        if(against === "Enemie") {
            attacker = this._player
            defensor = this._enemie
        } else {
            attacker = this._enemie
            defensor = this._player
        }

        const attackerDamage = _CS_Math.calculateDamage({
            attacker: attacker,
            defensor: defensor,
            attackType: attackType
        })

        defensor.inflictDamage(attackerDamage)
        
        this._BattleStatus.logDamageResults(attacker, defensor, attackerDamage)
        this._BattleStatus.logHitResults(attacker, true)
    }
}

class _CS_Math {
    
    public static getLuckNumber() {
        return Math.floor((Math.random() * 6) + 1)
    }

    public static calculateDamage(o: {
        attacker: Player | Enemie,
        defensor: Player | Enemie,
        attackType: "Melee" | "LongRange"
    }): number {
        
        const rawDamage = this.calculateRawDamage({
            attacker: o.attacker,
            defender: o.defensor,
            attackType: o.attackType
        })

        return this.returnEffectiveDamage(rawDamage, _CS_Math.getLuckNumber())
    }

    private static calculateRawDamage(o: {
        attacker: Player | Enemie,
        defender: Player | Enemie,
        attackType: "Melee" | "LongRange"
    }): number {

        const { attacker, defender, attackType } = o

        const attacker_baseStats = attacker.getBaseStats()
        const defensor_baseStats = defender.getBaseStats()
        const defensor_ArmorStats = defender.getArmorStats()
        
        let attacker_WeaponStats
        attackType === "LongRange"
        ? attacker_WeaponStats = attacker.getLongRangeStats()
        : attacker_WeaponStats = attacker.getMeleeStats() 

        const damages = [
            attacker_baseStats.fisicalDamage  + attacker_WeaponStats.fisicalDamage,
            attacker_baseStats.fireDamage     + attacker_WeaponStats.fireDamage,
            attacker_baseStats.iceDamage      + attacker_WeaponStats.iceDamage,
            attacker_baseStats.thunderDamage  + attacker_WeaponStats.thunderDamage,
            attacker_baseStats.poisonDamage   + attacker_WeaponStats.poisonDamage
        ]

        const defenses = [
            defensor_baseStats.fisicalDefense + defensor_ArmorStats.fisicalDefense,
            defensor_baseStats.fireDefense    + defensor_ArmorStats.fireDefense,
            defensor_baseStats.iceDefense     + defensor_ArmorStats.iceDefense,
            defensor_baseStats.thunderDefense + defensor_ArmorStats.thunderDefense,
            defensor_baseStats.poisonDefense  + defensor_ArmorStats.poisonDefense
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
}

class _BattleStatus {

    private _status = {
        playerDamage: 0,
        enemieDamage: 0,
        playerHit: false,
        enemieHit: false,
        playerDied: false,
        enemieDied: false,
        triedToFlee: false,
        fleeSucced: false
    }

    getStatus() {
        return this._status
    }

    isBothAlive(): boolean {
        return !this._status.playerDied && !this._status.enemieDied
    }

    resetBattleLog(): void {

        this._status = {
            playerDamage: 0,
            enemieDamage: 0,
            playerHit: false,
            enemieHit: false,
            playerDied: false,
            enemieDied: false,
            triedToFlee: false,
            fleeSucced: false
        }
    }

    logFlee(succed: boolean): void {
        this._status.triedToFlee = true
        this._status.fleeSucced = succed
    }

    logHitResults(attacker: Player | Enemie, didHit: boolean): void {

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

    logDamageResults(attacker: Player | Enemie, defensor: Player | Enemie, damageValue: number): void {

        attacker instanceof Player
        ? this._status.playerDamage = damageValue
        : this._status.enemieDamage = damageValue

        this.logDefensorDeath(defensor)
    }

    private logDefensorDeath(defensor: Player | Enemie) {

        if(defensor.getIsAlive()) {
            return
        }

        defensor instanceof Player
        ? this._status.playerDied = true
        : this._status.enemieDied = true
    }
}

class _BattleMessage {

    static chooseBattleMessage(battle: Battle): void {


        const player = battle.getPlayer()
        const enemie = battle.getEnemie()
        const _BattleStatus = battle.getStatus()
        const {
            playerHit,
            enemieHit,
            playerDamage,
            enemieDamage,
            playerDied,
            enemieDied,
            triedToFlee,
            fleeSucced
        } = _BattleStatus.getStatus()

        //=============================
        // FLEE POSSIBILITIES =========
        //=============================

        if(//Trie to flee, fail and receives hit
            triedToFlee &&
            !fleeSucced &&
            enemieHit
        ) {
            SendMessage_UI.battle(battle, `
                Sua fulga falhou!! E você sofreu ${enemieDamage} de dano!!!
            `)
            _BattleStatus.resetBattleLog()
            return
        }

        if(//Trie to flee, fail and Dies
            triedToFlee &&
            !fleeSucced &&
            enemieHit &&
            playerDied
        ) {
            SendMessage_UI.firePit(player, `
                RIP. Sua fulga falhou e você morreu sofrendo ${enemieDamage} de dano.
            `)
            _BattleStatus.resetBattleLog()
            return
        }

        if(//Trie to flee, fail and enemie miss
            triedToFlee &&
            !fleeSucced &&
            !enemieHit
        ) { 
            SendMessage_UI.battle(battle, `
                Sua fulga falhou mas uma esquiva foi conectada, UFFAAA!!
            `)
            _BattleStatus.resetBattleLog()
            return
        }
    
        //=============================
        // NO DAMAGE POSSIBILITIES ====
        //=============================
    
        if(//Both miss
            !playerHit && !enemieHit &&
            !playerDied && !enemieDied
        ) {
            
            SendMessage_UI.battle(battle, `
                UUUUUUUUUUUUUUUUUUUUU ambos erraram o ataque
            `)
            _BattleStatus.resetBattleLog()
            return
        }
    
        //=============================
        // DAMAGE POSSIBILITIES =======
        //=============================
    
        if(//Both hit
            playerHit && enemieHit &&
            !playerDied && !enemieDied
        ) {
            SendMessage_UI.battle(battle, `
                Ambos se acertaram! você causou ${playerDamage} de dano,
                e sofreu ${enemieDamage} de dano.
            `)
            _BattleStatus.resetBattleLog()
            return
        }
    
        if(//Player Miss, enemie hits
            !playerHit && enemieHit &&
            !playerDied && !enemieDied
        ) {
            SendMessage_UI.battle(battle, `
                OUUCH, você errou o ataque e tomou  ${enemieDamage} de dano!!!
            `)
            _BattleStatus.resetBattleLog()
            return
        }
    
        if(//Enemie hit, player miss
            playerHit && !enemieHit &&
            !playerDied && !enemieDied
        ) {
            SendMessage_UI.battle(battle, `
                Conseguiu se esquivar e causar ${playerDamage} de dano!!!
            `)
            _BattleStatus.resetBattleLog()
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
            _BattleStatus.resetBattleLog()
            return
        }
        
        if(//Both hit, enemie dies
            playerHit && enemieHit &&
            !playerDied && enemieDied
        ) {
            SendMessage_UI.idle(player, `
                VITÓRIA!! Você sofreu ${enemieDamage} de dano mas venceu!!!
                Recursos ganhos: ${battle.returnResourcesRewardsString()}.
            `)
            _BattleStatus.resetBattleLog()
            return
        }
        
        if(//Player hit and kill enemie
            playerHit && !enemieHit &&
            !playerDied && enemieDied
        ) {
            SendMessage_UI.idle(player, `
                VITÓRIA!! Você conseguiu matar ${enemie.getName()} conectando uma esquiva!!!
                Recursos ganhos: ${battle.returnResourcesRewardsString()}.
            `)
            _BattleStatus.resetBattleLog()
            return
        }
    
        if(//Enemie hit and kills player
            !playerHit && enemieHit &&
            playerDied && !enemieDied
        ) {
            SendMessage_UI.firePit(player, `
                RIP, você errou o ataque e morreu com ${enemieDamage} de dano!!!
            `)
            _BattleStatus.resetBattleLog()
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
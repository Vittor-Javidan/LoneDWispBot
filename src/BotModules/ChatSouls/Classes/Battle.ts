import Emote from '../../../Twitch/Emotes.js';
import sendMessage from '../../../Twitch/sendMessageHandler.js';
import { CS_Catalog_Habilities, CS_ResourceData } from '../Globals/moduleTypes.js';
import CS_Math from './CS_Math.js';
import Entity from './Entity.js';
import Enemie from './EntityChilds/Enemie.js';
import Player from './EntityChilds/Player.js';
import Habilities from './Habilities.js';
import SendMessage_UI from './SendMessage.js';
import Travel from './Travel.js';

const PLAYER_TURN = 1
const ENEMIE_TURN = 2
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
    private _playerFleed: boolean = false
    private _enemieFleed: boolean = false
    
    private _turn: 1 | 2 | undefined = undefined
    private _earnedResources: CS_ResourceData[] = []
    private _battleHistory: string[] = []

    private constructor(player: Player, enemie: Enemie){
        
        this._player = player
        this._enemie = enemie
    }

    //=================================================================================================
    // PUBLIC METHODS =================================================================================
    //=================================================================================================

    public playerAction(attackType: "Flee" | "Melee" | "LongRange" | CS_Catalog_Habilities) {

        const player = this.getPlayer()
        const enemie = this.getEnemie()

        if(this._turn === PLAYER_TURN) {
            
            this.buffRound(enemie)
            this.buffRound(player)
            this.playerRound(attackType)
            this.enemieRound()
            
        } else {
            
            this.buffRound(player)
            this.buffRound(enemie)
            this.enemieRound()
            this.playerRound(attackType)
        }

        this.sendMessageAndStateChange()
    }

    public logBattleHistory(messageToAdd: string) {
        this._battleHistory.push(messageToAdd)
    }

    public resetBattleHistory() {
        this._battleHistory = []
    }

    public getBattleStatusString(): string {
        return `| ${this.getPlayerStatus()} | ${this.getEnemieStatus()}`
    }

    public getTurn(): number | undefined { return this._turn }
    public setTurn(whosFirst: "PlayerFirst" | "EnemieFirst"): void {

        whosFirst === "PlayerFirst"
        ? this._turn = PLAYER_TURN
        : this._turn = ENEMIE_TURN
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

    public static initializeBattle(player: Player, enemie: Enemie): Battle {
        
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
    
    public static doesBattleExist(userName: string): boolean {
        return this._battlesList[userName] !== undefined
    }
    
    public static deleteBattle(userName: string): void {
        delete this._battlesList[userName]
    }

    public static returnStringWithAllBattles(): string {

        const battlesList = this._battlesList
        const battles = Object.values(battlesList)

        let message = 'Jogadores em batalha nesse momento: '

        if(battles.length === 0){
            return message + '| Nenhum |'
        }

        battles.forEach(battle => {
            message += `| ${battle.getPlayerStatus()} vs ${battle.getEnemieStatus()} `
        }); message += '|'
        
        return message
    }

    public returnResourcesRewardsString(): string {

        let message = `Recursos ganhos: `

        if(this._earnedResources.length <= 0) {
            message += `nenhum :(`
        }

        this._earnedResources.forEach(resource => {
            message += `${resource.amount}x ${resource.name}, `
        })

        return message.slice(0, -2)
    }

    //=================================================================================================
    // PRIVATE METHODS ===============================================================================
    //=================================================================================================

    private determineFirstTurn(): void {
        CS_Math.evasionEventSucced({
            from: this._player, 
            against: this._enemie, 
            evasionWeight: 1
        }) ? this._turn = PLAYER_TURN : this._turn = ENEMIE_TURN
    }

    private registerBattle(): void {
        Battle._battlesList[this._player.getName()] = this
    }

    private calculateRewards(): void {

        Object.values(this._enemie.getInventoryResources()).forEach(resource => {
            this.calculateLoot(resource, Math.random())
        })
        this._player.addSouls(this._enemie.getSouls())
    }

    private calculateLoot(resources: CS_ResourceData, randomNumber: number): void {

        if(!resources.dropChance) {
            throw Error(`ERROR: Battle Class, "calculateLoot": Enemie resource without dropchance`)
        }
        
        if(resources.dropChance < randomNumber) {
            return
        }
        
        const newResourceObject = {
            name: resources.name,
            amount: resources.amount,
            type: resources.type
        }
        this._player.addResources(newResourceObject)
        this._earnedResources.push(structuredClone(newResourceObject))
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

    private playerRound(attackType: "Flee" | "Melee" | "LongRange" | CS_Catalog_Habilities) {

        const player = this.getPlayer()
        const enemie = this.getEnemie()

        if(!player.getIsAlive() || this._enemieFleed) {
            return
        }

        if(attackType === 'Flee') {
            this.fleeAttempt(player)
            return
        }

        this.attackAttempt({
            attacker: player,
            target: enemie,
            attackType: attackType
        })
        this.checkDeath(enemie)
    }

    private enemieRound() {

        const player = this.getPlayer()
        const enemie = this.getEnemie()

        if(!enemie.getIsAlive() || this._playerFleed) {
            return 
        }

        const randomAction = enemie.randomAction({
            castChance: 25,
            weaponChance: 50,
        })

        randomAction === "Habilitie"
        ? this.attackAttempt({
            attacker: enemie,
            target: player,
            attackType: enemie.chooseRandomHabilitie()
        })
        : this.attackAttempt({
            attacker: enemie,
            target: player,
            attackType: randomAction
        })

        this.checkDeath(player)
    }

    private buffRound(entity: Entity) {

        const entityBuffs = entity.getBuffs()

        for(const buffName in entityBuffs) {

            const buff = entityBuffs[buffName]

            if(buff.type === 'Damage') {
                
                const enemieDefenses = CS_Math.sumStatsObjects([entity.getBaseStats(), entity.getArmorStats()])
                const rawDamage = CS_Math.rawDamageReceived(buff.buffStats, enemieDefenses)
                const effectiverDamage = CS_Math.returnEffectiveDamage(rawDamage, CS_Math.getLuckNumber())
                
                entity.inflictDamage(effectiverDamage)

                entity instanceof Player
                ? this.logBattleHistory(`${Emote._SMOrc_} ${Emote._bleedPurple_} ${this.getEnemie().getName()} sofreu ${effectiverDamage} de dano para ${buff.name}.`)
                : this.logBattleHistory(`${Emote._SirMad_} ${Emote._bleedPurple_} Você sofreu ${effectiverDamage} de dano para ${buff.name}.`)

                this.checkDeath(entity)
            }

            buff.turns -= 1
            
            if(buff.turns <= 0) {
                entity.deleteBuff(buffName as CS_Catalog_Habilities)

                entity instanceof Player
                ? this.logBattleHistory(`${Emote._SirPrise_} ${Emote._Jebaited_} ${buff.name} Expirou.`)
                : this.logBattleHistory(`${Emote._SMOrc_} ${Emote._Jebaited_} ${buff.name} Expirou.`)

                entity.calculateStatsFromBuffs()
            }
        }
    }
    

    private attackAttempt(options: {
        attacker: Entity, 
        target: Entity, 
        attackType: "Melee" | "LongRange" | CS_Catalog_Habilities, 
    }): void {

        const { attacker, target, attackType} = options

        //When a habilitie is choosed
        if(attackType !== 'Melee' && attackType !== "LongRange"){
            attacker instanceof Player
            ? Habilities.useHabilitie(attackType, {caster: attacker, target: this.getEnemie(), battle: this})
            : Habilities.useHabilitie(attackType, {caster: attacker, target: this.getPlayer(), battle: this})
            return
        }
    
        //When a weapon attack is choosed
        if(CS_Math.evasionEventSucced({
            from: target,
            against: attacker,
            evasionWeight: config.ATTACK.EVASION_WEIGHT
        })) {
            attacker instanceof Player
            ? this.logBattleHistory(`${Emote._SirPrise_} ${Emote._SirSad_} Você errou seu ataque!`)
            : this.logBattleHistory(`${Emote._SirPrise_} ${Emote._SirUwU_} Você conseguiu se esquivar!`)
            return
        }
        this.causeDamage(attacker, target, attackType)
    }

    private fleeAttempt(coward: Entity) {

        let bully
        
        coward instanceof Player
        ? bully = this.getEnemie()
        : bully = this.getPlayer()

        if(CS_Math.evasionEventSucced({
            from: coward,
            against: bully,
            evasionWeight: 1.5
        })) {

            if(coward instanceof Player) {
                this.logBattleHistory(`${Emote._SirUwU_} Você conseguiu fugir com sucesso!`)
                this._playerFleed = true
                return
            }
            
            this.logBattleHistory(`${Emote._SMOrc_} ${coward.getName()} Fugiu da batalha!`)
            this._enemieFleed = true
            return
        }

        coward instanceof Player
        ? this.logBattleHistory(`${Emote._SirSad_} Sua fuga falhou!`)
        : this.logBattleHistory(`${Emote._SMOrc_} ${coward.getName()} tentou fugir e falhou!`)
    }

    private checkDeath(entity: Entity): void {

        if(entity.getIsAlive()) {
            return
        }

        entity instanceof Player
        ? this.playerDied()
        : this.playerWon()
    }

    private playerWon(): void {

        const player = this._player
        
        this.calculateRewards()
        this.battleEnds()
        this.logBattleHistory(`${Emote._GlitchCat_} VOCÊ GANHOU!!!`)
        
        player.save()
    }

    private playerDied(): void {

        const player = this._player

        sendMessage(`
            O Jogador ${Emote._PowerUpL_} @${player.getName()} ${Emote._PowerUpR_} MORREU!! 
            ${player.getSouls()} almas foram perdidas *-*.
        `)
    
        player.setSouls(0) 
        player.save()
        this.battleEnds()
        this.logBattleHistory(`${Emote._DarkMode_} VOCÊ MORREU!!!`)
    }

    private battleEnds(): void {

        if(this.isBothAlive()) {
            return
        }
        
        Battle.deleteBattle(this._player.getName())
    }

    private causeDamage(attacker: Entity, target: Entity, attackType: "Melee" | "LongRange"): void {

        let attackerDamage

        attackType === "LongRange"
        ? attackerDamage = CS_Math.rawDamage_LongRange(attacker, target)
        : attackerDamage = CS_Math.rawDamage_Melee(attacker, target)

        target.inflictDamage(attackerDamage)

        attacker instanceof Player
        ? this.logBattleHistory(`${Emote._SirUwU_} ${Emote._SirSword_} você causou  ${attackerDamage} de dano!!`)
        : this.logBattleHistory(`${Emote._SMOrc_} ${Emote._SirSword_} Você sofreu ${attackerDamage} de dano!!!`)
    }
    
    private isBothAlive() {
        return this.getPlayer().getIsAlive() && this.getEnemie().getIsAlive()
    }

    private sendMessageAndStateChange() {

        const player = this.getPlayer()
        const enemie = this.getEnemie()

        switch (true) {

            case this._playerFleed: Travel.to_Explore(player, this.buildLogMessage())    ;break
            case this._enemieFleed: Travel.to_Explore(player, this.buildLogMessage())    ;break
            case !player.getIsAlive(): Travel.to_FirePit(player, this.buildLogMessage()) ;break
            case !enemie.getIsAlive(): Travel.to_Explore(player, this.buildLogMessage()) ;break

            case this.isBothAlive():
                SendMessage_UI.battle(this, this.buildLogMessage())
                this.resetBattleHistory()
                break

            default: throw Error(`ERROR: Battle class "sendMessageAndStateChange": a not considerer case was catch.`)
        }
    }

    private buildLogMessage(): string {

        let message = ''
        this._battleHistory.forEach(sentence => {
            message += `${sentence} `
        })
        return message
    }
}

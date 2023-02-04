import Emote from '../../../Twitch/Emotes.js';
import sendMessage from '../../../Twitch/sendMessageHandler.js';
import { CS_Catalog_Habilities, CS_EquipmentTypes, CS_HabilitieData, CS_ResourceData } from '../Globals/moduleTypes.js';
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

    public playerFisicalAttackScenario(attackType: "Melee" | "LongRange") {

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

    public playerHabilitieUsageScenario(habilitieName: CS_Catalog_Habilities): void {
        
        const player = this.getPlayer()
        const enemie = this.getEnemie()
        
        Habilities.useHabilitie(habilitieName, {
            caster: player,
            target: enemie,
            battle: this
        })
        this.checkDeath(enemie)
        
        this.buffRound(enemie)
        this.buffRound(player)
        this.enemieRound()
        
        this.sendMessageAndStateChange()
    }

    public playerFleeScenario() {

        const player = this.getPlayer()
        const enemie = this.getEnemie()

        if(CS_Math.evasionEventSucced({
            from: player,
            against: enemie,
            evasionWeight: 1.5
        })) {
            this.logBattleHistory(`${Emote._SirUwU_} Você conseguiu fugir com sucesso!`)
            Battle.deleteBattle(player.getName())
            Travel.to_Explore(player, this.buildLogMessage())
            return
        }
        this.logBattleHistory(`${Emote._SirSad_} Sua fuga falhou!`)

        this.buffRound(player)
        this.buffRound(enemie)
        this.enemieRound()
        
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
        CS_Math.evasionEventSucced({
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

    /**
     * Returns a string with Player 
     * current and max HP already 
     * formatted.
     */
    private getPlayerStatus(): string {
        
        const playerName = this._player.getName()
        const playerHP = this._player.getCurrentHP()
        const playerMana = this._player.getCurrentMana()
        const playerMaxHP = this._player.getBaseStats().hp + this._player.getArmorStats().hp
        const playerMaxMana = this._player.getBaseStats().mana + this._player.getArmorStats().mana
        const playerHPString = `${playerName}: ${playerHP}/${playerMaxHP} HP, ${playerMana}/${playerMaxMana} Mana`

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

        const player = this.getPlayer()
        const enemie = this.getEnemie()

        if(!player.getIsAlive()) {
            return
        }

        this.weaponAttackAttempt(player, enemie, attackType)
        this.checkDeath(enemie)
    }

    private enemieRound() {

        const player = this.getPlayer()
        const enemie = this.getEnemie()

        if(!enemie.getIsAlive()) {
            return 
        }

        const CAST_CHANCE = 25
        const rngChance = Math.floor(Math.random() * 100) + 1

        rngChance <= CAST_CHANCE
        ? this.enemieHabilitieUsageAttempt()
        : this.weaponAttackAttempt(enemie, player, this.decideEnemieWeapon()) 
        
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
                entity.calculateStatsFromBuffs()
            }
        }
    }

    private decideEnemieWeapon(): "Melee" | "LongRange" {

        const enemieEquipment = this._enemie.getAllCurrentEquipments()
        const enemieMelee = enemieEquipment["meleeWeapon"]
        const enemieLongRange = enemieEquipment["longRangeWeapon"]

        if(enemieMelee.name !== "Empty" && enemieLongRange.name !== "Empty") {

            const WEAPON_CHOOSE_CHANCE = 50
            const rngChance = Math.floor(Math.random() * 100) + 1
                
            if(rngChance <= WEAPON_CHOOSE_CHANCE){
                return "Melee"
            } else {
                return "LongRange"
            }
        }

        if(enemieLongRange.name !== 'Empty') {
            return "LongRange"
        } else {
            return "Melee"
        }
    }

    private enemieHabilitieUsageAttempt(): void {

        const enemie = this.getEnemie()

        const enemiesHabilities = enemie.getCurrentHabilities()
        const habilities: CS_HabilitieData[] = []

        for(const equipmentType in enemiesHabilities) {

            const habilitie =  enemiesHabilities[equipmentType as CS_EquipmentTypes]
            
            if(habilitie.name !== 'Empty') {
                habilities.push(habilitie)
            }
        }

        const habilitiesAmount = habilities.length
        const indexChoosed = Math.floor(Math.random() * habilitiesAmount)

        const noHabilityEquipped = habilities.length === 0
        if(noHabilityEquipped) {
            this.weaponAttackAttempt(enemie, this.getPlayer(), this.decideEnemieWeapon()) 
            return
        }
        
        Habilities.useHabilitie(habilities[indexChoosed].name, {
            caster: enemie,
            target: this.getPlayer(),
            battle: this
        })
    }
    
    private weaponAttackAttempt(attacker: Entity, target: Entity, attackType: "Melee" | "LongRange") {
    
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
        
        if(this.isBothAlive()){
            SendMessage_UI.battle(this, this.buildLogMessage())
            this.resetBattleHistory()
            return
        }

        if(enemie.getIsAlive()) {
            Travel.to_FirePit(player, this.buildLogMessage())
            return
        }

        if(player.getIsAlive()) {
            Travel.to_Explore(player, this.buildLogMessage())
            return
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

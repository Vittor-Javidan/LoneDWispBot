import CS_DbSystem from "../../database/CS_DbSystem.js"
import { CS_AttributeTypes, CS_Catalog_MapAreas, CS_PlayerState } from "../../Globals/moduleTypes.js"
import { PLAYER_DEFAULT } from "../../Globals/PLAYER_DEFAULT.js"
import Entity from "../Entity.js"

export default class Player extends Entity {

    static #registeredPlayers: string[] = CS_DbSystem.loadPlayersEntry()
    static #onlinePlayers: Record<string, Player> = {}

    #canPlay: boolean = true
    isNewPlayer: boolean = false
    #currentState: CS_PlayerState = structuredClone(PLAYER_DEFAULT.STATES)
    #currentLocation: CS_Catalog_MapAreas = PLAYER_DEFAULT.CURRENT_LOCATION

    constructor(name: string) {
        
        super(name)
        this.setAttributes(structuredClone(PLAYER_DEFAULT.ATTRIBUTES))
        this.setAllCurrentEquipments(structuredClone(PLAYER_DEFAULT.EQUIPMENTS))
    }

    //=================================================================================================
    // GETTERS AND SETTERS ============================================================================
    //=================================================================================================

    static getOnlinePlayers(): Record<string, Player> { return this.#onlinePlayers }
    static setOnlinePlayers(playerArray: Record<string, Player>): void {
        
        this.#onlinePlayers = playerArray
    }

    static getRegisteredPlayers(): string[] { return this.#registeredPlayers }

    getCurrentState(): CS_PlayerState { return this.#currentState }
    setCurrentState(stateObject: CS_PlayerState): void {

        this.#currentState = structuredClone(stateObject)
    }

    getCurrentLocation(): CS_Catalog_MapAreas { return this.#currentLocation }
    setCurrentLocation(mapName: CS_Catalog_MapAreas): void {

        this.#currentLocation = mapName
    }

    getCanPlay(): boolean { return this.#canPlay }
    setCanPlay(boolean: boolean): void {

        this.#canPlay = boolean
    }

    //=================================================================================================
    // CLASS METHODS ==================================================================================
    //=================================================================================================

    /** Deletes Player database file. Use with caution */
    static deletePlayer(playerName: string, areYouSure: boolean){

        if(!areYouSure) {
            return
        }

        CS_DbSystem.deletePlayer(playerName)
        this.deletePlayerEntrie(playerName, areYouSure)
    }

    static deletePlayerEntrie(playerName: string, areYouSure: boolean): void {

        if(!areYouSure) {
            return
        }

        const registeredPlayers = Player.getRegisteredPlayers()
        if(!registeredPlayers.includes(playerName)) {
            return
        }

        const playerIndex: number = registeredPlayers.indexOf(playerName)
        registeredPlayers.splice(playerIndex, 1)
        CS_DbSystem.savePlayerEntry(registeredPlayers)

    }

    static startGame(userName: string): Player {

        const player = new Player(userName)

        this.registerPlayer(player)
        this.loginPlayerInstance(player)

        player.load()
        player.calculateBaseStats()
        player.calculateStatsFromEquips()
        player.recoverHP()

        return player
    }

    static isLogged(userName: string): boolean {
        
        if(this.getOnlinePlayers()[userName]) {
            return true
        }
        return false
    }

    static loginPlayerInstance(playerInstance: Player): void {

        const onlinePlayer = this.getOnlinePlayers()
        const playerName = playerInstance.getName()

        if(!onlinePlayer[playerName]) {
            onlinePlayer[playerName] = playerInstance
        }
    }

    static registerPlayer(player: Player) {
        
        const playerName = player.getName()
        const registeredplayer = this.#registeredPlayers

        if(!registeredplayer.includes(playerName)) {

            registeredplayer.push(playerName)               
            CS_DbSystem.savePlayerEntry(registeredplayer)
            player.save()
        }
    }

    static logoutPlayerInstance(playerInstance: Player): void {
        this.logoutPlayerInstanceByName(playerInstance.getName())
    }

    static logoutPlayerInstanceByName(playerName: string) {

        const onlinePlayer = this.getOnlinePlayers()

        if(onlinePlayer[playerName]) {
            delete onlinePlayer[playerName]
        }
    }

    static getPlayerInstance(playerName: string): Player {
        return this.getOnlinePlayers()[playerName]
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

    load(): void {

        const playerSavedData = CS_DbSystem.loadPlayer(this.getName())

        if(!playerSavedData) {
            return
        }

        this.setSouls(playerSavedData.souls)
        this.setlevel(playerSavedData.level)
        this.setAttributes(playerSavedData.attributes)
        this.setAllCurrentEquipments(playerSavedData.equipment)
        this.setInventory(playerSavedData.inventory)
    }

    save(){

        const playerName = this.getName()
        CS_DbSystem.savePlayer({
            name:       playerName,
            souls:      this.getSouls(),
            level:      this.getlevel(),
            attributes: this.getAttributes(),
            equipment:  this.getAllCurrentEquipments(),
            inventory:  this.getInventory()
        }, playerName)
    }

    getLevelUpgradeCost(): number {
        return Math.round(500 * Math.pow(1.10, this.getlevel()))
    }

    upgradeAttributeProcessHandler(attributeType: CS_AttributeTypes){

        const upgradeCost = this.getLevelUpgradeCost()

        this.decreaseSouls(upgradeCost)
        this.addAttributes(attributeType)
        this.addLevel()
        this.calculateBaseStats()
        this.calculateStatsFromEquips()
        this.recoverHP()
        this.save()
    }

    timeoutPlayer(milisseconds: number){
        
        this.setCanPlay(false)
        const delay = setInterval(() => {
            this.setCanPlay(true)
            clearDelayTimer()
        }, milisseconds)

        function clearDelayTimer(){
            clearInterval(delay)
        }
    }
}
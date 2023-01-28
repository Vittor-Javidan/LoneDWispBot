import { afterEach, expect, test } from "vitest";
import { CS_Attributes, CS_Catalog_MapAreas, CS_Equipments, CS_Inventory, CS_PlayerState } from "../../Globals/moduleTypes";
import { PLAYER_DEFAULT } from "../../Globals/PLAYER_DEFAULT";
import Player from "./Player";

afterEach(() => {
	Player.setOnlinePlayers({})
})

//=================================================================================================
// CONSTRUCTOR ====================================================================================
//=================================================================================================

test(`constructor
    - Should instantiate with default properties
`, () => {

    const name = "Dummy Player: constructor()"
	const player = new Player(name)

	//Tests
	expect(player.getName()).toBe(name)
	expect(player.getAttributes()).toStrictEqual(PLAYER_DEFAULT.ATTRIBUTES)
	expect(player.getAllCurrentEquipments()).toStrictEqual(PLAYER_DEFAULT.EQUIPMENTS)
	expect(player.getCurrentState()).toStrictEqual(PLAYER_DEFAULT.STATES)
	expect(player.getCurrentLocation()).toBe(PLAYER_DEFAULT.CURRENT_LOCATION)
})

//=================================================================================================
// GETTERS AND SETTERS ============================================================================
//=================================================================================================

test(`
	getOnlinePlayers
	setOnlinePlayers
	- Should set and get current online players
`, () => {

	const player_1 = new Player(`TEST_Player1_getOnlinePlayers_setOnlinePlayers`)
	const player_2 = new Player(`TEST_Player2_getOnlinePlayers_setOnlinePlayers`)
	const newOnlinePlayers = {
		"TEST_Player1_getOnlinePlayers_setOnlinePlayers": player_1,
		"TEST_Player2_getOnlinePlayers_setOnlinePlayers": player_2
	}

	Player.setOnlinePlayers(newOnlinePlayers)
	const onlinePlayer = Player.getOnlinePlayers()

	expect(onlinePlayer).toStrictEqual(newOnlinePlayers)
})

test(`
	getCurrentState
	setCurrentState
	- Should set and get current state 
`, () => {

	const player = new Player(`TEST_Player_getCurrentState_setCurrentState`)
	const newState: CS_PlayerState = {
		primary: "FIRE_PIT",
		secondary: "RESTING_ON_FIRE_PIT"
	}

	player.setCurrentState(newState)
	const retrievedState = player.getCurrentState()

	expect(retrievedState).toStrictEqual(newState)
})

test(`
	getCurrentLocation
	setCurrentLocation
	- Should set and get current location
`, () => {

	const player = new Player(`TEST_Player_getCurrentLocation_setCurrentLocation`)
	const newLocation: CS_Catalog_MapAreas = "testArea"

	player.setCurrentLocation(newLocation)
	const retrievedLocation = player.getCurrentLocation()

	expect(retrievedLocation).toBe(newLocation)
})

test(`
	getCanPlay
	setCanPlay
	- Should set and get canPlay
`, () => {

	const player = new Player(`TEST_Player_getCurrentLocation_setCurrentLocation`)
	const newCanPlay = false

	player.setCanPlay(newCanPlay)
	const retrievedCanPlay = player.getCanPlay()

	expect(retrievedCanPlay).toBe(newCanPlay)
})

//=================================================================================================
// CLASS METHODS ==================================================================================
//=================================================================================================

test(`isLogged
	- Should return "True" if logged, and "False" otherwise
`, () => {

	const name = `TEST_Player_isLogged`
	const player = new Player(name)
	
	expect(Player.isLogged(name)).toBe(false)
	Player.loginPlayerInstance(player)
	expect(Player.isLogged(name)).toBe(true)
})

test(`loginPlayerInstance
	- Should login player instance
`, () => {

	const name = `TEST_Player_loginPlayerInstance`
	const player = new Player(name)

	Player.loginPlayerInstance(player)

	expect(Player.getOnlinePlayers()[name]).toBeDefined()
})

test(`registerPlayer
	- Should register new players
`, () => {

	const name = `TEST_Player_registerPlayer`
	const player = new Player(name)

	Player.registerPlayer(player)

	expect(Player.getRegisteredPlayers().includes(name)).toBe(true)

	//Sanitizer
	Player.deletePlayer(name, true)
})

test(`
	logoutPlayerInstance
	logoutPlayerInstanceByName
`, () => {

	const name = `TEST_Player_logoutPlayerInstance_logoutPlayerInstanceByName`
	const player = new Player(name)

	//Using player instance
	Player.loginPlayerInstance(player)
	expect(Player.isLogged(name)).toBe(true)
	Player.logoutPlayerInstance(player)
	expect(Player.isLogged(name)).toBe(false)

	//Using player name
	Player.loginPlayerInstance(player)
	expect(Player.isLogged(name)).toBe(true)
	Player.logoutPlayerInstanceByName(name)
	expect(Player.isLogged(name)).toBe(false)
})

test(`getPlayerInstance
	- Should retrive player instance using just a name
`, () => {

	const name = `TEST_Player_getPlayerInstance`
	const player = new Player(name)
	Player.loginPlayerInstance(player)

	const retrievedPlayerInstance = Player.getPlayerInstance(name)

	expect(retrievedPlayerInstance.getName()).toBe(name)
})

//=================================================================================================
// INSTANCE METHODS ============================================================================
//=================================================================================================

test(`load
	- Should load player info
`, () => {

	const player = new Player("Test_Dummy_Guy")

	player.load()

	expect(player.getSouls()).toBe(Test_Dummy_Guy.getSouls())
	expect(player.getlevel()).toBe(Test_Dummy_Guy.getLevel())
	expect(player.getAttributes()).toStrictEqual(Test_Dummy_Guy.getAttributes())
	expect(player.getAllCurrentEquipments()).toStrictEqual(Test_Dummy_Guy.getCurrentEquipment())
	expect(player.getInventory()).toStrictEqual(Test_Dummy_Guy.getInventory())
})

test(`getLevelUpgradeCost`, () => {

	const playerLevel = 87
	const player = new Player(`TEST_Player_getLevelUpgradeCost`)
	player.setlevel(playerLevel)

	const retrivedLevelUpgradeCost = player.getLevelUpgradeCost()

	expect(retrivedLevelUpgradeCost).toBe(
		Math.round(500 * Math.pow(1.10, playerLevel))
	)
})

test(`timeoutPlayer
	- Shold set "canPlay" to false, and back to true after timeout
`, async () => {

	const asyncGuy = new Player("TEST_Player_timeoutPlayer")
	
	asyncGuy.timeoutPlayer(5)
	
	expect(asyncGuy.getCanPlay()).toBe(false)
	await new Promise(resolve => setTimeout(resolve, 10))
	expect(asyncGuy.getCanPlay()).toBe(true)
})

class Test_Dummy_Guy {

	static getSouls(): number {
		return 9800
	}

	static getLevel(): number {
		return 51
	}

	static getAttributes(): CS_Attributes {
		return {
			vitality: 21,
			agility: 21,
			strenght: 21,
			intelligence: 21
		}
	}

	static getCurrentEquipment(): CS_Equipments {
		return {
			longRangeWeapon: {
				name: "Dummy Equipment",
				type: "longRangeWeapon"
			},
			meleeWeapon: {
				name: "Dummy Equipment",
				type: "meleeWeapon"
			},
			helmet: {
				name: "Dummy Equipment",
				type: "helmet"
			},
			bodyArmor: {
				name: "Dummy Equipment",
				type: "bodyArmor"
			},
			gloves: {
				name: "Dummy Equipment",
				type: "gloves"
			},
			boots: {
				name: "Dummy Equipment",
				type: "boots"
			}    
		}
	}

	static getInventory(): CS_Inventory {
		return {
			equipments: {
				longRangeWeapon: {
					array: [
						{
							name: "Dummy Equipment",
							type: "longRangeWeapon"
						},
						{
							name: "Dummy Equipment",
							type: "longRangeWeapon"
						}
					],
					type: "longRangeWeapon"
				},
				meleeWeapon: {
					array: [
						{
							name: "Dummy Equipment",
							type: "meleeWeapon"
						},
						{
							name: "Dummy Equipment",
							type: "meleeWeapon"
						}
					],
					type: "meleeWeapon"
				},
				helmet: {
					array: [
						{
							name: "Dummy Equipment",
							type: "helmet"
						},
						{
							name: "Dummy Equipment",
							type: "helmet"
						}
					],
					type: "helmet"
				},
				bodyArmor: {
					array: [
						{
							name: "Dummy Equipment",
							type: "bodyArmor"
						},
						{
							name: "Dummy Equipment",
							type: "bodyArmor"
						}
					],
					type: "bodyArmor"
				},
				gloves: {
					array: [
						{
							name: "Dummy Equipment",
							type: "gloves"
						},
						{
							name: "Dummy Equipment",
							type: "gloves"
						}
					],
					type: "gloves"
				},
				boots: {
					array: [
						{
							name: "Dummy Equipment",
							type: "boots"
						},
						{
							name: "Dummy Equipment",
							type: "boots"
						}
					],
					type: "boots"
				}
			},
			resources: {
				"Dummy Resource": {
					amount: 2,
					name: "Dummy Resource",
					type: "test"
				},
				"Dummy Resource 2": {
					amount: 2,
					name: "Dummy Resource 2",
					type: "test"
				}
			}
		}
	}

}
import { afterEach, expect, test } from "vitest";
import { get_DUMMY_ENEMIE } from "../database/enemies/TEST_AREA/TEST_AREA_ENEMIES";
import { CS_ResourceData, CS_Stats } from "../Globals/moduleTypes";
import Battle from './Battle';
import Enemie from "./EntityChilds/Enemie";
import Player from "./EntityChilds/Player";

afterEach(() => {
    Battle.battlesList = {}
})

//=================================================================================================
// CLASS METHODS ===============================================================================
//=================================================================================================

test(`startBattle
    - Should insntantiate and register the battle
`, () => {

    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const player = new Player(`TEST_Battle_startBattle`)
    Battle.startBattle(player, enemie)

    expect(Battle.battlesList[player.getName()]).toBeInstanceOf(Battle)
})

test(`getBattleByName
    - Should return a battle instance using just a name
`, () => {

    const name = `TEST_Battle_getBattleByName`
    const player = new Player(name)
    const enemie = new Enemie(get_DUMMY_ENEMIE())
    Battle.startBattle(player, enemie)

    const retrievedBattle = Battle.getBattleByName(name)

    expect(retrievedBattle.playerInstance.getName()).toBe(name)
})

test(`deleteBattle
    - Should delete a battle instance
`, () => {

    const name = `TEST_Battle_deleteBattle`
    const player = new Player(name)
    const enemie = new Enemie(get_DUMMY_ENEMIE())
    Battle.startBattle(player, enemie)

    Battle.deleteBattle(name)

    expect(Battle.battlesList[name]).toBeUndefined()
})

test(`doesBattleExist`, () => {

    const name = `TEST_Battle_doesBattleExist`
    const player = new Player(name)
    const enemie = new Enemie(get_DUMMY_ENEMIE())

    const answerFalse = Battle.doesBattleExist(name)
    expect(answerFalse).toBe(false)

    Battle.startBattle(player, enemie)

    const answerTrue = Battle.doesBattleExist(name)
    expect(answerTrue).toBe(true)
})

test(`returnStringWithAllBattles
    - Should return a specific formatted string for no battles case
    - Should return a formatted string when there is a battle happening
`, () => {

    const name = `TEST_Battle_deleteBattle`
    const player = new Player(name)
    const enemieData = get_DUMMY_ENEMIE()
    const enemie = new Enemie(enemieData)

    //With no battle
    const retrivedString_1 = Battle.returnStringWithAllBattles()
    expect(retrivedString_1).toBe(
        "Jogadores em batalha nesse momento: | Nenhum |"
    )

    //With a battle happening
    Battle.startBattle(player, enemie)
    const retrivedString_2 = Battle.returnStringWithAllBattles()
    expect(retrivedString_2).toBe(
        `Jogadores em batalha nesse momento: | ${player.getName()}: 1/0 HP vs ${enemieData.name}: 1/0 HP |`
    )
})

test(`calculateRawDamage
    - return the damage calculated
    - return 1 when fisical defense is higher than fisical damage
`, () => {

    const givenStats = {
        hp:             1,
        evasion:        0,
        fisicalDamage:  0,
        fisicalDefense: 0,
        magicalDamage:  0,
        magicalDefense: 0
    }
    
    const buffedAttack = structuredClone(givenStats)
    const nerfedAttack = structuredClone(givenStats)
    const buffedDefense = structuredClone(givenStats)
    const nerfedDefense = structuredClone(givenStats)
    const dummyPlayer = new Player("Dummy Player: calculateRawDamage()")
    const dummyEnemie = new Enemie(get_DUMMY_ENEMIE())
    const battleInstance = new Battle(dummyPlayer, dummyEnemie)

    buffedAttack.fisicalDamage = 100
    buffedDefense.fisicalDefense = 100
    nerfedAttack.fisicalDamage = 50
    nerfedDefense.fisicalDefense = 50

    //Normal Damage calculation
    dummyPlayer.setTotalStats(buffedAttack)
    dummyEnemie.setTotalStats(nerfedDefense)
    expect(Battle.calculateRawDamage({
        attacker: battleInstance.playerInstance,
        defender: battleInstance.enemieInstance
    })).toBe(50)

    //Return 1 when fisical defense is greater than attack damage
    dummyPlayer.setTotalStats(nerfedAttack)
    dummyEnemie.setTotalStats(buffedDefense)
    buffedAttack.fisicalDamage = 1
    expect(Battle.calculateRawDamage({
        attacker: battleInstance.playerInstance,
        defender: battleInstance.enemieInstance
    })).toBe(1)
})

test (`returnEffectiveDamage`, () => {

    const damage = 1000
    const luck_1 =  Battle.returnEffectiveDamage(damage, 1)
    const luck_2 =  Battle.returnEffectiveDamage(damage, 2)
    const luck_3 =  Battle.returnEffectiveDamage(damage, 3)
    const luck_4 =  Battle.returnEffectiveDamage(damage, 4)
    const luck_5 =  Battle.returnEffectiveDamage(damage, 5)
    const luck_6 =  Battle.returnEffectiveDamage(damage, 6)
    const no_Luck = Battle.returnEffectiveDamage(damage, 7)

    expect(luck_1).toBe(500)
    expect(luck_2).toBe(750)
    expect(luck_3).toBe(900)
    expect(luck_4).toBe(1100)
    expect(luck_5).toBe(1250)
    expect(luck_6).toBe(1500)
    expect(no_Luck).toBe(1000)
})

//=================================================================================================
// INSTANCE METHODS ===============================================================================
//=================================================================================================

test(`determineFirstTurn
    - Should be set to 1 when player has the advantaged
    - Should be set to 2 when enemie has the advantaged
`, () => {

    const givenAttributes = {
        hp: 0,
        evasion: 0,
        fisicalDamage: 0,
        magicalDamage: 0,
        fisicalDefense: 0,
        magicalDefense: 0
    }
    const enemieAttributes = structuredClone(givenAttributes)
    const playerAttributes = structuredClone(givenAttributes)
    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const player = new Player("TEST_Battle_determineFirstTurn")
    const battle = new Battle(player, enemie)

    //Player Advantage
    playerAttributes.evasion = 1000
    enemieAttributes.evasion = 0
    player.setCurrentLocation("theWoods")
    enemie.setTotalStats(enemieAttributes)
    player.setTotalStats(playerAttributes)
    battle.determineFirstTurn()
    expect(battle.turn).toBe(1)

    battle.turn = undefined
    
    //Enemie Advantage
    enemieAttributes.evasion = 1000
    playerAttributes.evasion = 0
    player.setCurrentLocation("theWoods")
    player.setTotalStats(playerAttributes)
    enemie.setTotalStats(enemieAttributes)
    battle.determineFirstTurn()
    expect(battle.turn).toBe(2)
})

test(`registerBattle
    - Should register battles
`, () => {

    const name = `TEST_Battle_registerBattle`
    const player = new Player(name)
    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const battle = new Battle(player, enemie)

    expect(Battle.battlesList[name]).toBeUndefined()
    battle.registerBattle()
    expect(Battle.battlesList[name]).toBeInstanceOf(Battle)
})

test(`isBothAlive
    - should return true when both are alive
    - should return false when player or enemie is dead
`, () => {

    const name = `TEST_Battle_isBothAlive`
    const player = new Player(name)
    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const battle = new Battle(player, enemie)

    //Both alive
    player.setIsAlive(true)
    enemie.setIsAlive(true)
    const bothAliveTrue = battle.isBothAlive()
    expect(bothAliveTrue).toBe(true)

    //Player Dead
    player.setIsAlive(false)
    enemie.setIsAlive(true)
    const bothAliveFalse_1 = battle.isBothAlive()
    expect(bothAliveFalse_1).toBe(false)

    //Enemie Dead
    player.setIsAlive(true)
    enemie.setIsAlive(false)
    const bothAliveFalse_2 = battle.isBothAlive()
    expect(bothAliveFalse_2).toBe(false)
})

test(`calculateRewards
    - Should send the resources and souls to players inventory 
`, () => {
            
    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const player = new Player("TEST_Battle_calculateRewards")
    const battleInstance = new Battle(player, enemie)
    player.setSouls(0)

    battleInstance.calculateRewards()    

    expect(player.getSouls()).toBe(enemie.getSouls())
    expect(player.getInventoryResources()).toStrictEqual({
        "Dummy Resource": {
            name: "Dummy Resource",
            amount: 1,
            type: "Test",
        }
    })
})

test(`calculateLoot
    - Should Give resource when the random number is lower than dropchance item,
    - Should Give resource when the random number is equal dropchance item
    - Should Not give resource when the random number is greater than dropchance item
`, () => {

    const givenResource = {
        name: "Dummy Resource",
        amount: 1,
        type: "Test",
        dropChance: 0.5
    }

    const player = new Player("TEST_Battle_calculateLoot")
    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const battle = new Battle(player, enemie)

    //random number is lower than dropchance item
    player.setInventoryResources({})
    battle.calculateLoot(givenResource, 0)
    expect(player.getInventoryResources()[givenResource.name]).toStrictEqual({
        name: "Dummy Resource",
        amount: 1,
        type: "Test"
    })

    //random number is equal dropchance item
    player.setInventoryResources({})
    battle.calculateLoot(givenResource, 0.5)
    expect(player.getInventoryResources()[givenResource.name]).toStrictEqual({
        name: "Dummy Resource",
        amount: 1,
        type: "Test"
    })

    //random number is greater than dropchance item
    player.setInventoryResources({})
    battle.calculateLoot(givenResource, 1)
    expect(player.getInventoryResources()[givenResource.name]).toBeUndefined()
})

test(`returnResourcesRewardsString
    - Should return a formatted string with all resources earned
`, () => {

    const earnedResources: CS_ResourceData[] = [
        {
            name: 'Fake Item',
            amount: 2,
            type: 'Fake Item',
            dropChance: 1
        },
        {
            name: 'Another Fake Item',
            amount: 4,
            type: 'Fake Item',
            dropChance: 1
        }
    ]

    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const player = new Player("TEST_Battle_returnResourcesRewardsString")
    const battle = new Battle(player, enemie)
    battle.earnedResources = earnedResources

    const message = battle.returnResourcesRewardsString()

    expect(message).toBe(`Recursos ganhos: 2x Fake Item, 4x Another Fake Item`)
})

test(`evasionEventSucced
    - return True When evasion event succed
    - return False if it fails
`, () => {

    const nerfedStats: CS_Stats = {
        hp:             1,
        evasion:        0, //Makes sure evasion event aways fails
        fisicalDamage:  1,
        fisicalDefense: 1,
        magicalDamage:  1,
        magicalDefense: 1
    }
    const buffedStats: CS_Stats = {
        hp:             1,
        evasion:        1000, //Makes sure, evasion event ways succed
        fisicalDamage:  1,
        fisicalDefense: 1,
        magicalDamage:  1,
        magicalDefense: 1
    }

    const dummy = new Player("TEST_Battle_evasionEventSucced")
    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const battleInstance = new Battle(dummy, enemie)

    //1
    enemie.setTotalStats(nerfedStats)
    dummy.setTotalStats(buffedStats)
    expect(battleInstance.evasionEventSucced({
        from: dummy,
        against: enemie,
        evasionWeight: 1
    })).toBe(true)

    //2
    enemie.setTotalStats(buffedStats)
    dummy.setTotalStats(nerfedStats)
    expect(battleInstance.evasionEventSucced({
        from: dummy,
        against: enemie,
        evasionWeight: 1
    })).toBe(false)
})

test(`getBattleStatus
    - Should return a formated string containing battle info
`, () => {

    const enemie = new Enemie(get_DUMMY_ENEMIE())
    const player = new Player("TEST_Battle_getBattleStatus")
    const battle = new Battle(player, enemie)

    enemie.calculateStats()
    player.calculateStats()
    
    const playerName = player.getName()
    const playerHP = player.getCurrentHP()
    const playerMaxHP = player.getTotalStats().hp

    const enemyName = enemie.getName()
    const enemyHP = enemie.getCurrentHP()
    const enemyMaxHP = enemie.getTotalStats().hp

    expect(battle.getBattleStatus()
    ).toEqual(`| ${playerName}: ${playerHP}/${playerMaxHP} HP | ${enemyName}: ${enemyHP}/${enemyMaxHP} HP`)
})

test(`getPlayerStatus
    - Should return a formated string containing Player battle infor
`, () => {

    const dummyEnemie = new Enemie(get_DUMMY_ENEMIE())
    const dummyPlayer = new Player("TEST_Battle_getPlayerStatus")
    const battleInstance = new Battle(dummyPlayer, dummyEnemie)
    
    dummyPlayer.calculateStats()
    
    expect(battleInstance.getPlayerStatus()
    ).toEqual(`${dummyPlayer.getName()}: ${dummyPlayer.getCurrentHP()}/${dummyPlayer.getTotalStats().hp} HP`)
})

test(`getEnemieStatus
    - return a formated string containing Enemie battle info
`, () => {

    const dummyEnemie = new Enemie(get_DUMMY_ENEMIE())
    const dummyPlayer = new Player("Dummy Player: getEnemieStatus()")
    const battleInstance = new Battle(dummyPlayer, dummyEnemie)

    dummyEnemie.calculateStats()
    
    expect(battleInstance.getEnemieStatus()
    ).toEqual(`${dummyEnemie.getName()}: ${dummyEnemie.getCurrentHP()}/${dummyEnemie.getTotalStats().hp} HP`)
})
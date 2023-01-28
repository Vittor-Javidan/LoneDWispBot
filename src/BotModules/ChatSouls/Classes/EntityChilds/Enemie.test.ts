import { expect, test } from "vitest";
import { enemiesDataBase } from "../../database/enemies/enemiesData";
import { get_DUMMY_ENEMIE } from "../../database/enemies/TEST_AREA/TEST_AREA_ENEMIES.js";
import { GAME_BALANCE } from "../../Globals/GAME_BALANCE";
import Enemie from "./Enemie.js";
import Player from "./Player.js";

test(`constructor
    - Should instantiate with enemie data
`, () => {
    
    const enemieData = get_DUMMY_ENEMIE()
    const enemieInstance = new Enemie(enemieData)

    expect(enemieInstance.getlevel()).toEqual(enemieData.level)
    expect(enemieInstance.getSouls()).toEqual(enemieData.souls)
    expect(enemieInstance.getAttributes()).toStrictEqual(enemieData.attributes)
    expect(enemieInstance.getAllCurrentEquipments()).toStrictEqual(enemieData.equipment)
    expect(enemieInstance.getInventory()).toStrictEqual(enemieData.inventory)
})

test(` initialize
    - Enemies should initialize with full hp and stats calculated
`, () => {
    
    //Instatiation
    const statsWeight = GAME_BALANCE.STATS_WEIGHT
    const enemieData = get_DUMMY_ENEMIE()
    const expectedTotalStats = {
        //    Stats     /                         Base Stats                           /      Stats From Equipments       
        hp:             (statsWeight.HP          * enemieData.attributes.vitality    ) + (statsWeight.HP          * 100 * 6),
        evasion:        (statsWeight.EVASION     * enemieData.attributes.agility     ) + (statsWeight.EVASION     * 100 * 6),
        fisicalDamage:  (statsWeight.FISICAL_DMG * enemieData.attributes.strenght    ) + (statsWeight.FISICAL_DMG * 100 * 2), 
        fisicalDefense: (statsWeight.FISICAL_DEF * enemieData.attributes.strenght    ) + (statsWeight.FISICAL_DEF * 100 * 4),
        magicalDamage:  (statsWeight.MAGICAL_DMG * enemieData.attributes.intelligence) + (statsWeight.MAGICAL_DMG * 100 * 2),
        magicalDefense: (statsWeight.MAGICAL_DEF * enemieData.attributes.intelligence) + (statsWeight.MAGICAL_DEF * 100 * 4)
    }
    
    const enemieInstance = Enemie.initialize(enemieData)
    
    expect(enemieInstance.getTotalStats()).toStrictEqual(expectedTotalStats)
    expect(enemieInstance.getCurrentHP()).toBe(expectedTotalStats.hp)
})

test(`instantiateRandomEnemie
    - Should retrieve a enemie instance from player current map area 
`, () => {

    const name = "Dummy Player: instantiateRandomEnemie()"
    const dummyPlayer = new Player(name)
    const enemiesNamesArray = Object.keys(enemiesDataBase["testArea"])
    dummyPlayer.setCurrentLocation("testArea")
    dummyPlayer.setlevel(1)
    
    const randomEnemie = Enemie.instantiateRandomEnemie(dummyPlayer)
    
    expect(enemiesNamesArray.includes(randomEnemie.getName())).toBe(true) //1
})

test(`getPossibleEnemies
    - Should get possible enemies for the current player level
`, () => {
    
    const theWooodsEnemiesData = enemiesDataBase["theWoods"]
    const expectedEnemies_Level5: string[] = [
        theWooodsEnemiesData["Javali"].name,
        theWooodsEnemiesData["Bandido"].name
    ]
    const unexpectedEnemie_Level10: string = theWooodsEnemiesData["Lobo"].name
    const dummyPlayer = new Player("TEST_Player_getPossibleEnemies")
    dummyPlayer.setCurrentLocation("theWoods")
    dummyPlayer.setlevel(5)

    const enemiesDataArray_L5 = Enemie.getPossibleEnemies(dummyPlayer)
    const enemiesNamesArray = enemiesDataArray_L5.map((entityData) => entityData.name)

    expect(enemiesNamesArray.includes(expectedEnemies_Level5[0])).toBe(true)
    expect(enemiesNamesArray.includes(expectedEnemies_Level5[1])).toBe(true)
    expect(enemiesNamesArray.includes(unexpectedEnemie_Level10)).toBe(false)
})
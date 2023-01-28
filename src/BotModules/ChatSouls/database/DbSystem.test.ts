import fs from 'fs';
import { describe, expect, test } from "vitest";
import { CS_EntityData } from "../Types/moduleTypes";
import DbSystem, { __projectFolder } from "./DbSystem";


describe(`DbSytem`, () => {

    const playerName = TestPlayer.getPlayerName()
    const playerData: CS_EntityData = TestPlayer.getPlayerData()

    test(`savePlayer
        - Should save the player on his own file,
    `, () => {
    
        //savePlayer
        DbSystem.savePlayer(playerData, playerName)
        expect(fs.existsSync(`${__projectFolder}/databaseFiles/chatsouls/players/${playerName}.json`)).toBe(true)    
    })
    
    test(`loadPlayer
        - Should load the file
    `, () => {
        
        //loadPlayer
        const loadedPlayerData = DbSystem.loadPlayer("Test_DbSystem_SavePlayer")
        expect(loadedPlayerData).toStrictEqual(playerData)
    })
    
    test(`deletePlayer
        - Should delete the file
    `, () => {
        
        //deletePlayer
        DbSystem.deletePlayer("Test_DbSystem_SavePlayer")
        expect(fs.existsSync(`${__projectFolder}/databaseFiles/chatsouls/players/${playerName}.json`)).toBe(false)
    })
})

class TestPlayer {

    static getRandomNumber(): number {
        return Math.floor(Math.random() * 100)
    }
    
    static getPlayerName(): string {
        return "Test_DbSystem_SavePlayer"
    }

    static getPlayerData(): CS_EntityData {
        return {
            name: this.getPlayerName(),
            souls: this.getRandomNumber(),
            level: 999999,
            attributes: {
                vitality: 0,
                agility: 0,
                intelligence: 0,
                strenght: 0
            },
            equipment: {
                longRangeWeapon: {
                    name: "Empty",
                    type: "longRangeWeapon",
                },
                meleeWeapon: {
                    name: "Empty",
                    type: "meleeWeapon"
                },
                helmet: {
                    name: "Empty",
                    type: "helmet"
                },
                bodyArmor: {
                    name: "Empty",
                    type: "bodyArmor"
                },
                gloves: {
                    name: "Empty",
                    type: "gloves"
                },
                boots: {
                    name: "Empty",
                    type: "boots"
                }
            },
            inventory: {
                equipments: {
                    longRangeWeapon: {
                        array: [],
                        type: "longRangeWeapon"
                    },
                    meleeWeapon: {
                        array: [],
                        type: "meleeWeapon"
                    },
                    helmet: {
                        array: [],
                        type: "helmet"
                    },
                    bodyArmor: {
                        array: [],
                        type: "bodyArmor"
                    },
                    gloves: {
                        array: [],
                        type: "gloves"
                    },
                    boots: {
                        array: [],
                        type: "boots"
                    }
                },
                resources: {}
            }
        }
    }
}
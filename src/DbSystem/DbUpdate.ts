import { CS_EntityData } from "../BotModules/ChatSouls/Globals/moduleTypes.js";
import DbSystem from "./DbSystem.js";

class ChatSoulsUpdated {

    static playersEntry = DbSystem.loadFile("chatsouls/playersEntry", "playersEntry.json") as string[]

    static updateHabilitiesSlots(areYouSuuuuuuuuuuuuuuuuuuuuuuuure: boolean) {

        if(!areYouSuuuuuuuuuuuuuuuuuuuuuuuure) {
            return
        }

        
        this.playersEntry.forEach(playerName => {
            
            
            
            const playerData = DbSystem.loadFile("chatsouls/players", `${playerName}.json`) as CS_EntityData
            const habilitiesArray =  Object.values(playerData.habilities)
            const newPlayerData: CS_EntityData = {
                name: playerData.name,
                level: playerData.level,
                souls: playerData.souls,
                attributes: playerData.attributes,
                equipment: playerData.equipment,
                habilities: {
                    1: {
                        name: habilitiesArray[0].name,
                        rank: habilitiesArray[0].rank
                    },
                    2: {
                        name: habilitiesArray[1].name,
                        rank: habilitiesArray[1].rank
                    },
                    3: {
                        name: habilitiesArray[2].name,
                        rank: habilitiesArray[2].rank
                    },
                    4: {
                        name: habilitiesArray[3].name,
                        rank: habilitiesArray[3].rank
                    },
                    5: {
                        name: habilitiesArray[4].name,
                        rank: habilitiesArray[4].rank
                    },
                    6: {
                        name: habilitiesArray[5].name,
                        rank: habilitiesArray[5].rank
                    }
                },
                inventory: playerData.inventory,
            }
            DbSystem.saveFile("chatsouls/players", `${playerName}.json`, newPlayerData)
        })
    }
}

ChatSoulsUpdated.updateHabilitiesSlots(true)
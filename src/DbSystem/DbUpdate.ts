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
            const newPlayerData: CS_EntityData = {
                name: playerData.name,
                level: playerData.level,
                souls: playerData.souls,
                attributes: playerData.attributes,
                equipment: playerData.equipment,
                habilities: playerData.habilities,
                inventory: playerData.inventory,
            }
            DbSystem.saveFile("chatsouls/players", `${playerName}.json`, newPlayerData)
        })
    }
}

//ChatSoulsUpdated.updateHabilitiesSlots(true)
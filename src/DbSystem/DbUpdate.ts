import { PLAYER_DEFAULT } from "../BotModules/ChatSouls/Globals/DEFAULT_VALUES/PLAYER_DEFAULT.js";
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
            playerData.habilities = PLAYER_DEFAULT.HABILITIES
            DbSystem.saveFile("chatsouls/players", `${playerName}.json`, playerData)
        })
    }
}

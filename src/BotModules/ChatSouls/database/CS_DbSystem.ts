import DbSystem from '../../../DbSystem/DbSystem.js'
import { CS_EntityData } from '../Globals/moduleTypes.js'

export default class CS_DbSystem extends DbSystem {

	static savePlayer(object: CS_EntityData, playerName: string): void {
		super.saveFile("chatsouls/players", `${playerName}.json`, object)
	}

	static loadPlayer(playerName: string): CS_EntityData {
		return super.loadFile("chatsouls/players", `${playerName}.json`) as CS_EntityData
	}

	static deletePlayer(playerName: string): void {
		super.deleteFile("chatsouls/players", `${playerName}.json`)
	}

	static savePlayerEntry(array: string[]): void {
		super.saveFile("chatsouls/playersEntry", "playersEntry.json", array)
	}

	static loadPlayersEntry(): string[] {
		return super.loadFile("chatsouls/playersEntry", "playersEntry.json") as string[] 
	}
}

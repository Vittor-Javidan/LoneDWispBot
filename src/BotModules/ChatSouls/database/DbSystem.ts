import fs from 'fs'
import { URL } from 'url'
import sendMessage from '../../../Twitch/sendMessageHandler.js'
import { CS_EntityData } from '../Types/moduleTypes.js'

export const __projectFolder = decodeURI(new URL('./', import.meta.url).pathname).slice(1, -35)
export const __playersDataFolder = `${__projectFolder}/databaseFiles/chatsouls/players`
export const __playersEntriesFolder = `${__projectFolder}/databaseFiles/chatsouls/playersEntry`

export default class DbSystem {

	static loadPlayer(playerName: string): CS_EntityData {
		
		try {
			
			const data = fs.readFileSync(`${__playersDataFolder}/${playerName}.json`, 'utf-8')
			return JSON.parse(data)

		} catch (error) {

			sendMessage(`o arquivo de @${playerName} não foi carregado ou não existe`)
            throw Error("ERROR: DbSystem class: file did not load or don't exist")
		}
	}

	static savePlayer(object: CS_EntityData, playerName: string): void {

		fs.writeFileSync(`${__playersDataFolder}/${playerName}.json`, JSON.stringify(object, null, 4))
	}

	static deletePlayer(playerName: string): void {

		fs.unlink(`${__playersDataFolder}/${playerName}.json`, (err) => {
			
			console.log(err)
			sendMessage(`Ocorreu um erro ao deletar o arquivo de @${playerName}`)
			sendMessage(`@${playerName} foi deletedo`)
			throw err
		})
	}

	static savePlayerEntry(array: string[]): void {

		fs.writeFileSync(`${__playersEntriesFolder}/playersEntry.json`, JSON.stringify({ "entries": array }, null, 4))
	}

	static loadPlayersEntry(): string[] {

		try {
			
			const data = fs.readFileSync(`${__playersEntriesFolder}/playersEntry.json`, 'utf-8')
			return JSON.parse(data)["entries"]

		} catch (error) {

			console.log(error)
			sendMessage(`o arquivo de registro de jogadores não foi carregado`)
            throw Error("ERROR: DbSystem class: players entry file did not load")
		}
	}
}

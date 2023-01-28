import fs from 'fs'
import { URL } from 'url'
import sendMessage from '../Twitch/sendMessageHandler.js'

const __projectFolder = decodeURI(new URL('./', import.meta.url).pathname).slice(1, -14)
const __dataBaseFolder = `${__projectFolder}/databaseFiles` 

export default class DbSystem {
    
    static saveFile(folderName: string, fileName: string, data: object): void {
        
        const folderDir = `${__dataBaseFolder}/${folderName}`

        if (!fs.existsSync(folderDir)){
            fs.mkdirSync(folderDir);
        }
        
        fs.writeFileSync(`${__dataBaseFolder}/${folderName}/${fileName}`, JSON.stringify(data, null, 4))
    }

    static loadFile(folderName: string, fileName: string): object {

        let fileDir = `${__dataBaseFolder}/${folderName}/${fileName}`

        if (!fs.existsSync(fileDir)){

            console.log("===================================")
            throw Error(`ERROR: DbSystem: file doesn't exist`)
        }

        try {

            const data = fs.readFileSync(fileDir, 'utf-8')
            return JSON.parse(data)
            
        } catch (error) {

            sendMessage(`o arquivo de "${fileDir}" não foi carregado ou não existe`)
            console.log("=======================================================")
            throw Error("ERROR: DbSystem class: file did not load or don't exist")
        }
    }

    static deleteFile(folderName: string, fileName: string): void {

        const fileDir = `${__dataBaseFolder}/${folderName}/${fileName}`

        fs.unlink(fileDir, (err) => {
			
            console.log("=========================")
            console.log(`${folderName}/${fileName}`)
            console.log("=========================")
			console.log(err)
            console.log("=========================")

			sendMessage(`Ocorreu um erro ao deletar o arquivo "${folderName}/${fileName}"`)

			throw err
		})
    }
}

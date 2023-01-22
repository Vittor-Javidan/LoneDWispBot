import sendMessage from "../../../Twitch/sendMessageHandler.js"
import Auction from "../Classes/Auction.js"

export default function createManyAuctions(message: string): void {

	const words = message.split(' ')
	
	if(isEntryInvalid(words)) return

    const minutes = Number(words[2])
    
    let namesString = '|'
    for(let i = 3; i < words.length; i ++) {
        const itemName = words[i]
        Auction.init(itemName, minutes)
        namesString += `| ${itemName} |`
    }
    namesString += `|`
	
	sendMessage(`OS LEILÕES: ${namesString} COMEÇARAM E ACABA EM ${minutes} MINUTOS!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`)
}

/**
 * @param {string[]} words 
 * @returns 
 */
function isEntryInvalid(words: string[]): boolean {

    //Checks if words have at least 1 item
    if(words.length < 4){
        sendMessage(`Voce precisa inicializar pelo menos o leilão de 1 item`)
        return true
    }

    //Checks if minutes is a valid number
    const minutes = Number(words[2])
    if (
        typeof minutes !== 'number' ||
        minutes < 0
    ) {
        sendMessage(`o tempo precisa ser um número, e ser positivo`)
        return true
    }
    
    //Starts at the first itemName on index 3
    for(let i = 3; i < words.length; i ++) {

        //Checks for duplicates 
        if(Auction.isItemBeingAuctioned(words[i])) {
            sendMessage(`O item de nome ${words[i]} já está sendo leiloado`)
            return true
        }
    }

    return false
}
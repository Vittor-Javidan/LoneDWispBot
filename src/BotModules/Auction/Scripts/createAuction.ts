import sendMessage from "../../../Twitch/sendMessageHandler.js"
import Auction from "../Classes/Auction.js"

export default function createAuction(message: string): void {

	const words = message.split(' ')
	
	if(words.length !== 4){
		sendMessage(`commando possui um número de argumentos diferente do esperado`)
		return
	}

	const itemName = words[2].toUpperCase()						
	const minutes = Number(words[3])
	
	if(
        isAuctionDuplicate(itemName) || 
        isMinutesInvalid(minutes)) {
        return 
    }
	
	Auction.init(itemName, minutes)

	sendMessage(`LEILÃO DE UM ${itemName} COMEÇOU E ACABA EM ${minutes} MINUTOS!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`)
}

function isAuctionDuplicate(itemName: string): boolean {

	if(Auction.isItemBeingAuctioned(itemName)) {
        
		sendMessage(`O item de nome ${itemName} já está sendo leiloado`)
		return true
	}
	return false
}

function isMinutesInvalid(minutes: number): boolean {
	
	if (
        typeof minutes !== 'number' || 
        isNaN(Number(minutes))      ||
		minutes < 0
	) {
		sendMessage(`o tempo precisa ser um número, e ser positivo`)
		return true
	}
	return false
}

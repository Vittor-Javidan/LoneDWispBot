import sendMessage from "../../../Twitch/sendMessageHandler.js"
import Auction from "../Classes/Auction.js"

export default function setAuctionTimeLeft(message: string): void {

	const words = message.split(' ')
	const itemCode = Number(words[2])
    const minutes = Number(words[3])
	
	if(isInvalidMessageLenght(words)) return
    if(isMinutesInvalidNumber(minutes)) return
    if(isItemCodeInvalidNumber(itemCode)) return
	
	const auction = Auction.getInstanceByCode(itemCode)
	const itemName = auction.getItemName()

	auction.setMinutes(minutes)
	
	sendMessage(`Tempo restante de ${itemName} foi modificado para ${minutes} minutos`)
}

function isInvalidMessageLenght(words: string[]): boolean {
	
	if(words.length !== 4){
		sendMessage(`commando inválido.`)
		return true
	}
	
	return false
}

function isMinutesInvalidNumber(minutes: number): boolean {

	if(
		typeof minutes !== 'number' ||
        isNaN(minutes)      ||
		minutes < 0
	) {
		sendMessage(`o tempo precisa ser um número, e ser positivo`)
		return true
	}

	return false
}

function isItemCodeInvalidNumber(itemCode: number): boolean {

	if(
		typeof itemCode !== 'number' ||
        isNaN(Number(itemCode))      ||
		itemCode < 0
	) {
		sendMessage(`o o código precisa ser um número, e ser maior que zero`)
		return true
	}

	if(
		itemCode <= 0 || 
		itemCode > Auction.getAuctionsAmount()
	) {
		sendMessage(`O leilão de código "${itemCode}" não existe`)
		return true
	}

	return false
}
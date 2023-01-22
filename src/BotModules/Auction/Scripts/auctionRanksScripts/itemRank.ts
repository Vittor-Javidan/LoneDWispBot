import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import { TwitchDataPayload } from "../../../../Twitch/types.js"
import Auction from "../../Classes/Auction.js"
import { BidersArray } from "../../moduleTypes.js"

export default function itemRank(data: TwitchDataPayload): void {

	const userName = data.userName
	const itemCode = Number(data.message[0])
	
	if(isItemCodeInvalidNumber(userName, itemCode)) return
	
    const auction = Auction.getInstanceByCode(itemCode)
	const itemName = auction.getItemName()
	const bidersList = auction.getRank()

	if(isThereNoBid(itemName, bidersList)) return
	
	buildAndSendMessage(itemName, bidersList)
}

function isItemCodeInvalidNumber(userName: string, itemCode: number): boolean {

    if(itemCode > Auction.getAuctionsAmount()) {
        sendMessage(`@${userName} O código ${itemCode} não existe`)
		return true
	}
    return false
}

function isThereNoBid(itemName: string, bidersArray: BidersArray): boolean {

    if(bidersArray.length === 0) {
		sendMessage(`Ainda não há nenhum lance para ${itemName}`)
		return true
	}
    return false
}

function buildAndSendMessage(itemName: string, bidersArray: BidersArray): void {

	const firstNPlaces = 3

	let rankText = ''
	for(let i = 0; i < firstNPlaces && i < bidersArray.length; i++) {
		rankText += `| ${i + 1}. ${bidersArray[i].name} : ${bidersArray[i].score} pontos |`
	}
	rankText += '|'
    
	sendMessage(`RANK ${itemName}: |${rankText}`)
}
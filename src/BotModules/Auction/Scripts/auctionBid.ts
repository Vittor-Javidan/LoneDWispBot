import sendMessage from "../../../Twitch/sendMessageHandler.js"
import { TwitchDataPayload } from "../../../Twitch/types.js"
import Auction from "../Classes/Auction.js"

export default function bid(data: TwitchDataPayload, bidValue: number): void {

    const words = data.message.split(' ')
    const itemCode = Number(words[0])
    const userName = data.userName
    
    if(userName === undefined) return
    
	if(
        isItemCodeInvalidNumber(userName, itemCode) ||
        isThereIsNoAction()
    ) return
    
    const auction = Auction.getInstanceByCode(itemCode)

	if(isAuctionFinished(userName, auction)) return

	auction.bid({ 
		userName: userName,
		bidValue: bidValue
	})
}

function isThereIsNoAction(): boolean {

    if(Auction.getAuctionsAmount() <= 0){
		sendMessage(`Não há nenhum leilão acontencendo no momento`)
		return true
	}
    return false
}

function isItemCodeInvalidNumber(userName: string, itemCode: number): boolean {

    if(
        isNaN(itemCode) ||
        itemCode <= 0   ||
        itemCode > Auction.getAuctionsAmount()
    ) {
		sendMessage(`@${userName} O código ${itemCode} não existe`)
		return true
	}
    return false
}

function isAuctionFinished(userName: string, auction: Auction): boolean {

    if(auction.isAuctionFinished()) {
		sendMessage(`@${userName}, esse leilão já foi finalizado!`)
		return true
	}
    return false
}
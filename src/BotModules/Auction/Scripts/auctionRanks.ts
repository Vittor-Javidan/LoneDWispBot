import sendMessage from "../../../Twitch/sendMessageHandler.js"
import { TwitchDataPayload } from "../../../Twitch/types.js"
import Auction from "../Classes/Auction.js"

import generalRank from "./auctionRanksScripts/generalRank.js"
import itemRank from "./auctionRanksScripts/itemRank.js"

export default function auctionRanks(data: TwitchDataPayload): void {

	//Checks is there is no auction happening
	if(Auction.getAuctionsAmount() <= 0){
		sendMessage(`Não há nenhum leilão acontencendo no momento`)
		return
	}

	const userName = data.userName
	const words = data.message.split(' ')
	const itemCode = Number(words[0])

    switch(true) {

        case itemCode === 0: generalRank(data)  ;break
        case itemCode > 0: itemRank(data)       ;break

        default: sendMessage(`@${userName} O código ${itemCode} não existe`)
    }
}


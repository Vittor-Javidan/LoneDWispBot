import env from '../../env.js'
import { TwitchDataPayload } from '../../Twitch/types.js'
import createAuction from './Scripts/createAuction.js'
import createManyAuctions from './Scripts/createManyAuctions.js'
import endAllAuctions from './Scripts/endAllAuctions.js'
import sendPinMessage from './Scripts/sendPinMessage.js'
import setAuctionTimeLeft from './Scripts/setAuctionTimeLeft.js'

export default function auctionChatListeners(data: TwitchDataPayload): void {

	const userName = data.userName
	const message = data.message.toLowerCase()
	const auctionCommands = env.TWITCH.MODULES.AUCTION.COMMANDS

	//Broadcaster exclusive chat commands area
	if(userName === env.TWITCH.BROADCASTER_NAME) {

		switch (true) {
			case message.startsWith(auctionCommands.CREATE_MANY_AUCTIONS): 	createManyAuctions(message)		;break
			case message.startsWith(auctionCommands.CREATE_AUCTION): 		createAuction(message)			;break
			case message.startsWith(auctionCommands.SET_AUCTION_TIME_LEFT): setAuctionTimeLeft(message)		;break
			case message.startsWith(auctionCommands.END_ALL_AUCTIONS): 		endAllAuctions()				;break
			case message.startsWith(auctionCommands.PIN_MESSAGE): 			sendPinMessage()				;break
		}
	}
}
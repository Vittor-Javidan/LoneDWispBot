import auctionRewardListeners from "../../BotModules/Auction/rewardListenerHandler.js"
import musicRewardListeners from "../../BotModules/Music/rewardListenersHandler.js"
import websiteRewardListeners from "../../BotModules/Website/rewardListenersHandler.js"
import { TwitchDataPayload } from "../types.js"

export default function rewardListeners(data: TwitchDataPayload): void {

	if(!data.rewardIdentifier) {
        return
    }

    websiteRewardListeners(data)
    musicRewardListeners(data)
    auctionRewardListeners(data)
}
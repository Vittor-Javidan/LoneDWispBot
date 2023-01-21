import websiteRewardListeners from "../../BotModules/Website/rewardListenersHandler.js"
import { twitchDataPayload } from "../../types.js"

export default function rewardListeners(data: twitchDataPayload): void {

	if(!data.rewardIdentifier) {
        return
    }

    websiteRewardListeners(data)
}
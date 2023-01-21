import { twitchDataPayload } from "../../types.js"

export default function rewardListeners(data: twitchDataPayload): void {

	if(!data.rewardIdentifier) {
        return
    }
}
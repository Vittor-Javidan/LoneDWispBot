import env from "../../env.js";
import { twitchDataPayload } from "../../types.js";
import giveURL from "./Scripts/giveURL.js";

export default function websiteRewardListeners(data: twitchDataPayload): void {

	const rewardIdentifier = data.rewardIdentifier
	const websiteRewardIds = env.TWITCH.MODULES.WEBSITE.REWARDS_IDs

	switch (rewardIdentifier) {
		case websiteRewardIds.GIVE_WEBSITE_URL: giveURL(); break
	}
}
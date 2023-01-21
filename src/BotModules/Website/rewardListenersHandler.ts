import env from "../../env.js";
import { TwitchDataPayload } from "../../Twitch/types.js";
import giveURL from "./Scripts/giveURL.js";

export default function websiteRewardListeners(data: TwitchDataPayload): void {

	const rewardIdentifier = data.rewardIdentifier
	const websiteRewardIds = env.TWITCH.MODULES.WEBSITE.REWARDS_IDs

	switch (rewardIdentifier) {
		case websiteRewardIds.GIVE_WEBSITE_URL: giveURL(); break
	}
}
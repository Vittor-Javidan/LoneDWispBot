import env from "../../env.js";
import { TwitchDataPayload } from "../../Twitch/types.js";
import viewerMusicSugestion from "./Scripts/viewerMusicSugestionFeedback.js";

export default function musicRewardListeners(data: TwitchDataPayload): void{

	const { userName, rewardIdentifier } = data
    const musicRewardIds = env.TWITCH.MODULES.MUSIC.REWARDS_IDs
    
    if(userName === undefined) {
        return
    }
    
	switch (rewardIdentifier) {
		case musicRewardIds.PLAYLIST_MUSIC_SUGESTION: viewerMusicSugestion(userName); break
	}
}
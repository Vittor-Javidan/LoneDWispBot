import env from "../../../env.js";
import { TwitchDataPayload } from "../../../Twitch/types.js";
import checkPvEBattle from "./rewardListeners/checkPvEBattle.js";
import restoreEnemieHpPvE from "./rewardListeners/restoreEnemieHpPvE.js";
import restorePlayerHpPvE from "./rewardListeners/restorePlayerHpPvE.js";

export default function chatsoulsRewardHandler(data: TwitchDataPayload): void {

    const {rewardIdentifier} = data
	const chatSoulsRewardIds = env.TWITCH.MODULES.CHATSOULS.REWARDS_IDs

    switch(rewardIdentifier) {
        
        case chatSoulsRewardIds.CHECK_PVE_BATTLES:      checkPvEBattle();           break
        case chatSoulsRewardIds.RESTORE_PVE_ENEMIE_HP:  restoreEnemieHpPvE(data);   break
        case chatSoulsRewardIds.RESTORE_PVE_PLAYER_HP:  restorePlayerHpPvE(data);   break
    }
}
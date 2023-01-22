import env from '../../env.js'
import { TwitchDataPayload } from '../../Twitch/types.js'
import bid from './Scripts/auctionBid.js'
import auctionRanks from './Scripts/auctionRanks.js'

export default function auctionRewardListeners(data: TwitchDataPayload): void {

	const { rewardIdentifier } = data
	const auctionRewardIds = env.TWITCH.MODULES.AUCTION.REWARDS_IDs

	switch(rewardIdentifier) {
		case auctionRewardIds.AUCTION_RANKS: 	auctionRanks(data); break
		case auctionRewardIds.BID_100: 			bid(data, 100); 	break
		case auctionRewardIds.BID_500: 			bid(data, 500); 	break
		case auctionRewardIds.BID_1000: 		bid(data, 1000); 	break
		case auctionRewardIds.BID_5000: 		bid(data, 5000); 	break
		case auctionRewardIds.BID_10000: 		bid(data, 10000); 	break
	}
}
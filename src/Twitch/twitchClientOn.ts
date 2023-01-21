import client from './client.js'

/**
 * Initialize twitch Client Listeners
 */
export default function twitchClientOn(): void {

	client.on('message', (channelName, userstate, message) => {

		const data = {
            channelName: channelName,
			userName: userstate.username,
			rewardIdentifier: userstate['custom-reward-id'],
			message: message
		}

        console.log(data)
	})
}

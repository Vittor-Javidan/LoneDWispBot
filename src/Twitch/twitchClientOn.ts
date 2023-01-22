import client from './client.js'
import errorHandler from './errorHandler.js'
import chatListeners from './Listeners/chatListener.js'
import rewardListeners from './Listeners/rewardListeners.js'
import whisperListeners from './Listeners/whisperListeners.js'
import { TwitchDataPayload } from './types.js'

/**
 * Initialize twitch Client Listeners
 */
export default function twitchClientOn(): void {

	client.on('message', (channelName, userstate, message) => {

		if(userstate.username === undefined) return

		const data: TwitchDataPayload = {
            channelName: channelName,
			userName: userstate.username,
			rewardIdentifier: userstate['custom-reward-id'],
			message: message
		}

        try {
			chatListeners(data)
			rewardListeners(data)
		} catch(err) {
			errorHandler(err, data, userstate)
		}
	})

	client.on('whisper', (from, userstate, message) => {

		const data: TwitchDataPayload = {
			userName: from.slice(1), //the string 'from' always come with a '#' on index 0
			message: message
		}

		try {
			whisperListeners(data)
		} catch (err) {
			errorHandler(err, data, userstate)
		}
	}) 
}

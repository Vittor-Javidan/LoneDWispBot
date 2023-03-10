import tmi from 'tmi.js'
import env from '../env.js'

const options = {
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username: env.TWITCH.BOT_NAME,
		password: `oauth:${env.TWITCH.CLIENT_SECRET}`,
	},
	channels: [env.TWITCH.CHANNEL_NAME],
}
const client = new tmi.client(options)

client.connect().catch( err => {
	console.log('Could not connect to twitch')
	console.log(err)
})

export default client
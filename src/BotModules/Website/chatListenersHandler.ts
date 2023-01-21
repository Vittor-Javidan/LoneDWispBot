import env from "../../env.js"
import { twitchDataPayload } from "../../types.js"
import giveURL from "./Scripts/giveURL.js"

export default function websiteChatListeners(data: twitchDataPayload): void {

	const message = data.message.toLowerCase()
	const websiteCommands = env.TWITCH.MODULES.WEBSITE.COMMANDS

	switch (true) {
		case message.startsWith(websiteCommands.GIVE_WEBSITE_URL): giveURL(); break
	}
}
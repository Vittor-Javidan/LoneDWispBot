import websiteChatListeners from "../../BotModules/Website/chatListenersHandler.js";
import { twitchDataPayload } from "../../types.js";

export default function chatListeners(data: twitchDataPayload): void {

    websiteChatListeners(data)
}
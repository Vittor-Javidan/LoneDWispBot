import auctionChatListeners from "../../BotModules/Auction/chatListenerHandler.js";
import timerChatListeners from "../../BotModules/Timers/chatListenerHandler.js";
import websiteChatListeners from "../../BotModules/Website/chatListenersHandler.js";
import { TwitchDataPayload } from "../types.js";

export default function chatListeners(data: TwitchDataPayload): void {

    websiteChatListeners(data)
    timerChatListeners(data)
    auctionChatListeners(data)
}
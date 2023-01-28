import { TwitchDataPayload } from "../../../Twitch/types.js";
import startGame from "./chatListeners/startGame.js";

export default function chatSoulsChatListener(data: TwitchDataPayload): void {

    const userName = data.userName
    const message = data.message.toLowerCase()

    switch(true) {
        
        case message.startsWith('!chatsouls start'):        startGame(userName);            break
    }
}
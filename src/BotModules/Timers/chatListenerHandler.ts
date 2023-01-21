import env from "../../env.js";
import { TwitchDataPayload } from "../../Twitch/types.js";
import createTimer from "./Scripts/createTimer.js";
import deleteTimer from "./Scripts/deleteTimer.js";
import showTimers from "./Scripts/showTimers.js";

export default function timerChatListeners(data: TwitchDataPayload) {

    const userName = data.userName
    const message = data.message
	const timerCommands = env.TWITCH.MODULES.TIMER.COMMANDS

	if(userName === env.TWITCH.BROADCASTER_NAME) {

        switch (true) {
            case message.startsWith(timerCommands.SHOW_TIMERS):  showTimers()       ;break
            case message.startsWith(timerCommands.DELETE_TIMER): deleteTimer(data)  ;break
            case message.startsWith(timerCommands.CREATE_TIMER): createTimer(data)  ;break
        }
    }
}
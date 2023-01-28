import chatSoulsWhisperListeners from "../../BotModules/ChatSouls/Listeners/whisperHandler.js";
import { TwitchDataPayload } from "../types.js";

export default function whisperListeners(data: TwitchDataPayload): void {

    chatSoulsWhisperListeners(data)
}
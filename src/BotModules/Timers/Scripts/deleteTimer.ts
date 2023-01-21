import sendMessage from "../../../Twitch/sendMessageHandler.js"
import { TwitchDataPayload } from "../../../Twitch/types.js"
import Timer from "../Classes/Timer.js"

export default function deleteTimer(data: TwitchDataPayload): void {

    const words = data.message.split(' ')
    const timerName = words[2]
    
    if(words.length !== 3){
        sendMessage(`o formato correto é !timer delete <nome_timer>`)
        return
    }
    
    Timer.deleteTimer(timerName)
}

import sendMessage from "../../../Twitch/sendMessageHandler.js"
import { TwitchDataPayload } from "../../../Twitch/types.js"
import Timer from "../Classes/Timer.js"
import buildMessage from "./buildMessage.js"

export default function createTimer(data: TwitchDataPayload): void {

    const words = data.message.split(' ')
    const timerName = words[1]
    const intervalTime = Number(words[2])
    const timeLimit = Number(words[3])
    
    if(
        ( 
            typeof intervalTime !== 'number' && 
            typeof timeLimit !== 'number'
        ) || words.length < 5 
        ){
        
        sendMessage(`o formato correto é !timer <nome_timer> <tempo_intevalo> <tempo_expiração> <mensagem>`)
        return
    }
            
    const message = buildMessage(words)
    
    Timer.createTimer(timerName, message, intervalTime, timeLimit)
}

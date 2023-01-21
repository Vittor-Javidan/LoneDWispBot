import { ChatUserstate } from "tmi.js"
import sendMessage from "./sendMessageHandler.js"
import { TwitchDataPayload } from "./types.js"

function errorHandler(err: unknown, data: TwitchDataPayload, userstate: ChatUserstate) {
	
    console.log(err)
    console.log(userstate)
	
    if(data.rewardIdentifier){
		sendMessage(`Ocorreu um erro na recompensa resgatada de @${data.userName}. Id da recompensa: ${data.rewardIdentifier} `)
		return
	}
	
    sendMessage(`Ocorreu um erro com o comando "${data.message}"`)
}

export default errorHandler
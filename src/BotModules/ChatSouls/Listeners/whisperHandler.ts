import { TwitchDataPayload } from "../../../Twitch/types.js"
import Player from "../Classes/EntityChilds/Player.js"
import { CS_DataPayload } from "../Globals/moduleTypes.js"

import gameUIHandler from "../FrontEnd/Handlers/UI_PrimaryState_Handler.js"
import checkSouls from "./whisperListeners/checkSouls.js"
import exitGame from "./whisperListeners/exitGame.js"
import help from "./whisperListeners/help.js"

export default function chatSoulsWhisperListeners(data: TwitchDataPayload): void {

    const userName = data.userName
    const message = data.message.toLowerCase()

    if(!Player.isLogged(userName)) {
        return
    }

    const newData: CS_DataPayload = {
        playerInstance: Player.getPlayerInstance(userName),
        message: message
    }

    switch (true) {
        case (message.startsWith('!cs exit')):      exitGame(newData.playerInstance)    ;break
        case (message.startsWith('!cs help')):      help(newData.playerInstance)        ;break
        case (message.startsWith('!cs souls')):     checkSouls(newData.playerInstance)  ;break
        case (
            message.startsWith('!cs') || 
            !isNaN(Number(message))
        ):                                          gameUIHandler(newData)              ;break
    }
}
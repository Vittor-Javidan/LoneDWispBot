import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Battle from "../../Classes/Battle.js"

export default function checkPvEBattle(): void {
    const message = Battle.returnStringWithAllBattles()
    sendMessage(message)
}
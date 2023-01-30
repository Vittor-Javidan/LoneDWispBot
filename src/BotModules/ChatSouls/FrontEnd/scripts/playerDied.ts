import sendMessage from "../../../../Twitch/sendMessageHandler.js";
import Battle from "../../Classes/Battle.js";
import { sendMessage_UI_FirePit } from "../sendMessage/sendMessage_UI_firePit.js";

export default function playerDied(battle: Battle, finalMessage: string): void {

    const playerInstance = battle.playerInstance
    const playerName = playerInstance.getName()
    const souls = playerInstance.getSouls()
    
    finalMessage = `
        VOCÊ MORREU!! e ${souls} almas foram perdidas. 
        últimos momentos: ${finalMessage}.
        Você voltou a fogueira
    `
    sendMessage_UI_FirePit(playerInstance, finalMessage)
    sendMessage(`@${playerName} morreu!!! ${souls} almas foram perdidas *-*`)

    playerInstance.setSouls(0)
    playerInstance.recoverHP()
    playerInstance.ressurrect()
    playerInstance.save()
    playerInstance.setCurrentState({
        primary: "FIRE_PIT",
        secondary: "RESTING_ON_FIRE_PIT"
    })
    Battle.deleteBattle(playerInstance.getName())
}

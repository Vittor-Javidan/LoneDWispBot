import sendMessage from "../../../../Twitch/sendMessageHandler.js";
import Battle from "../../Classes/Battle.js";
import { sendMessage_UI_FirePit } from "../sendMessage/sendMessage_UI_firePit.js";

export default function playerDied(battle: Battle, finalMomentsMessage: string): void {

    feedBackMessage(battle, finalMomentsMessage)
    battle.playerDied({
        primary: "FIRE_PIT",
        secondary: "RESTING_ON_FIRE_PIT"
    })
}

function feedBackMessage(battle: Battle, finalMoments: string): void {

    const player = battle.playerInstance
    const playerName = player.getName()
    const souls = player.getSouls()
    
    let finalMessage = `
    VOCÊ MORREU!! e ${souls} almas foram perdidas. 
    últimos momentos: ${finalMoments}.
    Você voltou a fogueira
    `
    sendMessage_UI_FirePit(player, finalMessage)
    sendMessage(`@${playerName} morreu!!! ${souls} almas foram perdidas *-*`)
}

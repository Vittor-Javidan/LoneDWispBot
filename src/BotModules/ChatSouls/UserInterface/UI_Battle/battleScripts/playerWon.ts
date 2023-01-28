import Battle from "../../../Classes/Battle.js"
import { sendMessage_UI_Idle } from "../../UI_Idle/sendMessage_UI_Idle.js"

export default function playerWon(battle: Battle, finalMessage: string): void {

    const playerInstance = battle.playerInstance
    const enemieInstance = battle.enemieInstance
    const souls = enemieInstance.getSouls()
    
    playerInstance.setCurrentState({
        primary: "EXPLORING",
        secondary: "IDLE"
    })

    battle.calculateRewards()
    const earnedResources = battle.returnResourcesRewardsString()

    finalMessage = `VOCÊ GANHOU!! e recebeu ${souls} almas. ${earnedResources} . últimos momentos: ${finalMessage}`
    sendMessage_UI_Idle(playerInstance, finalMessage)

    playerInstance.save()
    Battle.deleteBattle(playerInstance.getName())
}
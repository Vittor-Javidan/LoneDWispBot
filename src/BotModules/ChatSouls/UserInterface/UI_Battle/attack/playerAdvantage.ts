import Battle from "../../../Classes/Battle.js"
import attackAttempt from "../../../FrontEnd/scripts/attackAttempt.js"
import sendMessage_UI_Battle from "../../../FrontEnd/sendMessage/sendMessage_UI_Battle.js"
import playerDied from "../battleScripts/playerDied.js"
import playerWon from "../battleScripts/playerWon.js"

export default function playerAdvantage(battle: Battle, dodgeWeight: number): void {

    const playerInstance = battle.playerInstance
    const enemieInstance = battle.enemieInstance
    
    let feedBackMessage = ''

    //Player Turn ========================================
    feedBackMessage += attackAttempt(battle, {
        attacker: playerInstance,
        defensor: enemieInstance,
        evasionWeight: dodgeWeight
    })

    if(!enemieInstance.getIsAlive()) {
        playerWon(battle, feedBackMessage)
        return   
    }

    feedBackMessage += 'e '
    
    //Enemie Turn ========================================
    feedBackMessage += attackAttempt(battle, {
        attacker: enemieInstance,
        defensor: playerInstance,
        evasionWeight: dodgeWeight
    }) 

    if(!playerInstance.getIsAlive()) {
        playerDied(battle, feedBackMessage)
        return
    }

    //End turn message ===================================
    sendMessage_UI_Battle(battle, feedBackMessage)
}
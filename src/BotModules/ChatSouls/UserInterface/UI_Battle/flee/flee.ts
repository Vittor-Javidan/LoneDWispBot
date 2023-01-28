import Battle from "../../../Classes/Battle.js"
import attackAttempt from "../battleScripts/attackAttempt.js"
import fleeAttempt from "../battleScripts/fleeAttempt.js"
import playerDied from "../battleScripts/playerDied.js"
import sendMessage_UI_Battle from "../sendMessage_UI_Battle.js"

export default function flee(battle: Battle, o: {
    fleeWeight: number,
    dodgeWeight: number
}): void {

    const {fleeWeight, dodgeWeight} = o
    const playerInstance = battle.playerInstance
    const enemieInstance = battle.enemieInstance
    
    if(fleeAttempt(battle, {
        coward: playerInstance,
        evasionWeight: fleeWeight,
    })) {
        return
    }
    
    const feedBackMessage = attackAttempt(battle, {
        attacker: enemieInstance,
        defensor: playerInstance,
        evasionWeight: dodgeWeight
    })
    
    if(!playerInstance.getIsAlive()) {
        playerDied(battle, `${feedBackMessage}`)
        return
    }
    
    sendMessage_UI_Battle(battle, `sua fuga falhou! ${feedBackMessage}`)
}

import Battle from "../../../Classes/Battle.js"
import Player from "../../../Classes/EntityChilds/Player.js"
import { sendMessage_UI_Idle } from "../../../FrontEnd/sendMessage/sendMessage_UI_Idle.js"

/**
 * @param {Battle} battle 
 * @param {Object} o
 * @param {number} o.evasionWeight
 * @param {Player} o.coward
 * @returns {boolean} `True` if success, `False` otherwise
 */
export default function fleeAttempt(battle: Battle, o: {
    coward: Player,
    evasionWeight: number
}): boolean {

    const { evasionWeight, coward } = o
    const playerInstance = battle.playerInstance
    const enemieInstance = battle.enemieInstance
    
    if(!battle.evasionEventSucced({
        from: playerInstance,
        against: enemieInstance,
        evasionWeight: evasionWeight
    })) return false

    Battle.deleteBattle(coward.getName())
    coward.setCurrentState({
        primary: "EXPLORING",
        secondary: "IDLE"
    })

    sendMessage_UI_Idle(coward,`Fuga bem sucedida!`)
    
    return true
}
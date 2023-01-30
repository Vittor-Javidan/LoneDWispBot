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

    const player = battle.playerInstance
    const enemie = battle.enemieInstance
    
    if(!battle.evasionEventSucced({
        from: player,
        against: enemie,
        evasionWeight: o.evasionWeight
    })) return false

    
    sendMessage_UI_Idle(o.coward,`Fuga bem sucedida!`)

    playerFleed(player)
    
    return true
}

function playerFleed(player: Player): void {

    Battle.deleteBattle(player.getName())
    player.setCurrentState({
        primary: "EXPLORING",
        secondary: "IDLE"
    })
}
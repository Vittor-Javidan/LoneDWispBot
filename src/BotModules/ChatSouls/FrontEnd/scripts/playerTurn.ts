import Battle from "../../Classes/Battle.js"
import attackAttempt from "./attackAttempt.js"

export function playerTurn(battle: Battle, dodgeWeight: number) {

    const player = battle.playerInstance
    const enemie = battle.playerInstance

    if(!player.getIsAlive()) {
        return
    }

    attackAttempt(battle, {
        attacker: player,
        defensor: enemie,
        evasionWeight: dodgeWeight
    })

    if(!enemie.getIsAlive()) {
        battle.playerWon({
            primary: "EXPLORING",
            secondary: "IDLE"
        })
    }
}
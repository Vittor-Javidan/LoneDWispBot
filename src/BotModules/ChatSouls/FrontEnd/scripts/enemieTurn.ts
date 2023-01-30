import Battle from "../../Classes/Battle.js"
import attackAttempt from "./attackAttempt.js"

export function enemieTurn(battle: Battle, dodgeWeight: number) {

    const player = battle.playerInstance
    const enemie = battle.playerInstance

    if(!enemie.getIsAlive()) {
        return
    }

    attackAttempt(battle, {
        attacker: enemie,
        defensor: player,
        evasionWeight: dodgeWeight
    }) 

    if(!player.getIsAlive()) {
        battle.playerDied({
            primary: "FIRE_PIT",
            secondary: "RESTING_ON_FIRE_PIT"
        })
        return
    }
}
import Battle from "../../Classes/Battle.js"
import Enemie from "../../Classes/EntityChilds/Enemie.js"
import Player from "../../Classes/EntityChilds/Player.js"

/** Return a Feedback message from the attack attempt */
export default function attackAttempt(battle: Battle, o: {
    attacker: Player | Enemie,
    defensor: Player | Enemie,
    evasionWeight: number
}): void {

    const { attacker, defensor, evasionWeight } = o
    
    if(battle.evasionEventSucced({
        from: attacker,
        against: defensor,
        evasionWeight: evasionWeight
    })) {
        return
    }
    
    const rawDamage = Battle.calculateRawDamage({
        attacker: attacker,
        defender: defensor
    })
    const luck = Math.floor((Math.random() * 6) + 1)
    const effectiveDamage = Battle.returnEffectiveDamage(rawDamage, luck)

    defensor.inflictDamage(effectiveDamage)
}

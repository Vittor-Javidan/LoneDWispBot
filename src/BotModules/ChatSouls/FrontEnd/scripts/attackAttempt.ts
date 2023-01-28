import handlesDamageLogics from "../../backEnd/scripts/handlesDamageLogics.js"
import Battle from "../../Classes/Battle.js"
import Enemie from "../../Classes/EntityChilds/Enemie.js"
import Player from "../../Classes/EntityChilds/Player.js"
import returnDamageMessage from "../buildMessages/returnDamageMessage.js"
import returnDodgeMessage from "../buildMessages/returnDodgeMessage.js"

/** Return a Feedback message from the attack attempt */
export default function attackAttempt(battle: Battle, o: {
    attacker: Player | Enemie,
    defensor: Player | Enemie,
    evasionWeight: number
}): string {
    
    if(battle.evasionEventSucced({
        from: o.attacker,
        against: o.defensor,
        evasionWeight: o.evasionWeight
    })) {
        return returnDodgeMessage(o.attacker)
    } 
    const damageValue = handlesDamageLogics(o.attacker, o.defensor)
    return returnDamageMessage(o.attacker, o.defensor, damageValue)
}

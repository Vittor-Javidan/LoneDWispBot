import Battle from "../../Classes/Battle.js"
import Enemie from "../../Classes/EntityChilds/Enemie.js"
import Player from "../../Classes/EntityChilds/Player.js"

export default function handlesDamageLogics(attacker: Player | Enemie, defensor: Player | Enemie): number {

    const luck = Math.floor((Math.random() * 6) + 1)

    const rawDamage = Battle.calculateRawDamage({
        attacker: attacker,
        defender: defensor
    })
    const effectiveDamage = Battle.returnEffectiveDamage(rawDamage, luck)

    defensor.inflictDamage(effectiveDamage)
    return effectiveDamage
}
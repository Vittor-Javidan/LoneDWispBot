import Battle from "../../../Classes/Battle.js"
import Enemie from "../../../Classes/EntityChilds/Enemie.js"
import Player from "../../../Classes/EntityChilds/Player.js"
import didDodge from "./didDogge.js"

/**
 * @param {Battle} battle
 * @param {object} o
 * @param {Player | Enemie} o.attacker
 * @param {Player | Enemie} o.defensor
 * @param {number} o.evasionWeight
 * @returns {string} action feedback message
 */
export default function attackAttempt(battle: Battle, o: {
    attacker: Player | Enemie,
    defensor: Player | Enemie,
    evasionWeight: number
}): string {

    const { attacker, defensor, evasionWeight } = o
    let message = ''
    
    //Dodge Phase =========================================================
    if(didDodge(battle, {
        attacker: attacker,
        defensor: defensor,
        evasionWeight: evasionWeight
    })) {

        attacker instanceof Player
            ? message = `${message} Você errou o ataque `
            : message = `${message} ${attacker.getName()} errou o ataque `
        //

        return message
    }

    //Damage Phase ========================================================
    const rawDamage = Battle.calculateRawDamage({
        attacker: attacker,
        defender: defensor
    })

    const luck = Math.floor((Math.random() * 6) + 1)
    const effectiveDamage = Battle.returnEffectiveDamage(rawDamage, luck)

    defensor.inflictDamage(effectiveDamage)

    attacker instanceof Player
        ? message = `${message} ${defensor.getName()} sofreu ${effectiveDamage} de dano `
        : message = `${message} você sofreu ${effectiveDamage} de dano `
    //
    
    return message
}
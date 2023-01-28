import Battle from "../../../Classes/Battle.js"
import Enemie from "../../../Classes/EntityChilds/Enemie.js"
import Player from "../../../Classes/EntityChilds/Player.js"

export default function didDodge(battle: Battle, o: {
    attacker: Player | Enemie,
    defensor: Player | Enemie,
    evasionWeight: number
}): boolean {

    const { attacker, defensor, evasionWeight } = o

    return battle.evasionEventSucced({
        from: defensor,
        against: attacker,
        evasionWeight: evasionWeight
    })
}
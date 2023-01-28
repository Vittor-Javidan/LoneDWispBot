import Enemie from "../../Classes/EntityChilds/Enemie.js"
import Player from "../../Classes/EntityChilds/Player.js"

export default function returnDodgeMessage(attacker: Player | Enemie): string {

    if(attacker instanceof Player) {
        return `Você errou o ataque `
    }
    return `${attacker.getName()} errou o ataque `
}
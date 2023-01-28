import Enemie from "../../Classes/EntityChilds/Enemie.js"
import Player from "../../Classes/EntityChilds/Player.js"

export default function returnDamageMessage(attacker: Player | Enemie, defensor: Player | Enemie, damage: number): string {
    
    if(attacker instanceof Player) {
        return `${defensor.getName()} sofreu ${damage} de dano `
    }
    return `você sofreu ${damage} de dano `
}

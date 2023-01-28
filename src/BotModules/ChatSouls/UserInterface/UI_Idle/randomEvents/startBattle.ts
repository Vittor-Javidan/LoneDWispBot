import Battle from "../../../Classes/Battle.js";
import Enemie from "../../../Classes/EntityChilds/Enemie.js";
import Player from "../../../Classes/EntityChilds/Player.js";
import sendMessage_UI_Battle from "../../UI_Battle/sendMessage_UI_Battle.js";

/**
 * @param {Player} player 
 */
export default function startBattle(player: Player) {
    
    player.setCurrentState({
        primary: "EXPLORING",
        secondary: "HUNTING"
    })

    const enemie = Enemie.instantiateRandomEnemie(player)
    const battleInstance = Battle.startBattle(player, enemie)
    const enemieInstance = battleInstance.enemieInstance
    const enemieName = enemieInstance.getName()

    const message = `Você encontrou um ${enemieName} ${returnWhosTurnString(battleInstance)}`
    
    sendMessage_UI_Battle(battleInstance, message)
}

export function returnWhosTurnString(battle: Battle): string {
    const turn = battle.turn
    let message = ""
    turn === 1
        ? message += `e você tem a vantagem de ataque `
        : message += `e ele tem a vantagem de ataque `
    return message
}
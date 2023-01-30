import Battle from "../../Classes/Battle.js";
import { enemieTurn } from "./enemieTurn.js";
import { playerTurn } from "./playerTurn.js";

const PLAYER_TURN = 1

export default function attack(battle: Battle, dodgeWeight: number): void {
    
    battle.turn === PLAYER_TURN
        ? playerAdvantage(battle, dodgeWeight)
        : enemieAdvantage(battle, dodgeWeight)
}

function playerAdvantage(battle: Battle, dodgeWeight: number): void {

    playerTurn(battle, dodgeWeight)
    enemieTurn(battle, dodgeWeight)
}

function enemieAdvantage(battle: Battle, dodgeWeight: number): void {

    enemieTurn(battle, dodgeWeight)
    playerTurn(battle, dodgeWeight)
}

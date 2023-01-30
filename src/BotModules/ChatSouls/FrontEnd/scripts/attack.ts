import Battle from "../../Classes/Battle.js";
import enemieAdvantage from "./enemieAdvantage.js";
import playerAdvantage from "./playerAdvantage.js";

export default function attack(battle: Battle, dodgeWeight: number): void {
    
    const turnPreference = battle.turn
    turnPreference === 1
        ? playerAdvantage(battle, dodgeWeight)
        : enemieAdvantage(battle, dodgeWeight)
}

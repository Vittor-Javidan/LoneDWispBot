import Player from "../../Classes/EntityChilds/Player.js";
import startBattle from "./randomEvents/startBattle.js";

export function explorationEvent(player: Player): void {

    startBattle(player)
}
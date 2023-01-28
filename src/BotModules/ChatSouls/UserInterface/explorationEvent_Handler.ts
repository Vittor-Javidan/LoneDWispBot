import to_Battle from "../backEnd/sendTo/to_Battle.js";
import Player from "../Classes/EntityChilds/Player.js";

export function explorationEvent(player: Player): void {

    to_Battle(player)
}
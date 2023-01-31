import Player from "../../Classes/EntityChilds/Player.js";
import Travel from "../../Classes/Travel.js";

export function explorationEvent(player: Player): void {

    Travel.to_Battle(player)
}
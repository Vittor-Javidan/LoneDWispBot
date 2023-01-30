import Battle from "../../../Classes/Battle.js"
import Player from "../../../Classes/EntityChilds/Player.js"

export default function playerFleed(player: Player): void {

    Battle.deleteBattle(player.getName())
    player.setCurrentState({
        primary: "EXPLORING",
        secondary: "IDLE"
    })
}
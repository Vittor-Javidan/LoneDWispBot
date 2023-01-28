import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Battle from "../../Classes/Battle.js"
import Player from "../../Classes/EntityChilds/Player.js"

export default function exitGame(player: Player): void {

    const playerName = player.getName()

    if(Battle.doesBattleExist(playerName)) {
        Battle.deleteBattle(playerName)
        player.setSouls(0)
        player.save()
        sendMessage(
            `/w ${playerName} Você saiu da batalha de modo forçado e perdeu todas suas almas`
        )
    }
    
    Player.logoutPlayerInstance(player)
    sendMessage(`/w ${playerName} Jogo encerrado.`)
}
import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import { TwitchDataPayload } from "../../../../Twitch/types.js"
import Battle from "../../Classes/Battle.js"
import Player from "../../Classes/EntityChilds/Player.js"

export default function restorePlayerHpPvE(data: TwitchDataPayload): void {

    const words = data.message.split(' ')
    let targetPlayer = words[0]

    if(battleDoNotExist(targetPlayer)){
        noBattleCase(data.userName)
        return
    }
    battleExistCase(data.userName, targetPlayer)
}

function battleDoNotExist(targetPlayer: string): boolean {
    return !Battle.doesBattleExist(targetPlayer)
}

function noBattleCase(userName: string): void {
    sendMessage(
        `Batalha PvE não encotrada ou já concluída: ${userName}`
    )
}

function battleExistCase(userName: string, targetPlayer: string): void{

    const battleInstance = Battle.getBattleByName(targetPlayer)
    const playerInBattle = battleInstance.getPlayer()
    
    if(playerInBattle.getName() === userName){
        lalauCurseMuahaha(playerInBattle, userName)
        return
    }
    recoverPlayerHP(playerInBattle, targetPlayer, userName)
}

function lalauCurseMuahaha(player: Player, userName: string): void {

    const playerSouls = player.getSouls()
    player.setSouls(Math.floor(playerSouls/2))
    player.save()
    sendMessage(`@${userName} tentou recuperar sua própria vida! Tamanha audacidade o fez perder metade de suas almas *-*`)
}

function recoverPlayerHP(player: Player, targetPlayer: string, userName: string) {

    player.recoverHP("maxHP")
    sendMessage(`/w ${targetPlayer} ${userName} acabou de restaurar sua vida!!!`)
    sendMessage(`${userName} restaurou a vida de ${targetPlayer} durante sua batalha :/`)
}
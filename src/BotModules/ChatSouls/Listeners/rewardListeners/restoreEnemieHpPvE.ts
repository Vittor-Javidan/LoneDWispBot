import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import { TwitchDataPayload } from "../../../../Twitch/types.js"
import Battle from "../../Classes/Battle.js"
import Player from "../../Classes/EntityChilds/Player.js"

export default function restoreEnemieHpPvE(data: TwitchDataPayload): void{

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

    const battle = Battle.getBattleByName(targetPlayer)
    const playerInBattle = battle.getPlayer()

    if(playerInBattle.getName() === userName){
        lalauCurseMuahaha(playerInBattle, userName)
        return
    }
    recoverEnemieHP(battle, targetPlayer, userName)
}

function lalauCurseMuahaha(player: Player, userName: string): void {

    const playerSouls = player.getSouls()
    player.setSouls(Math.floor(playerSouls/2))
    player.save()
    sendMessage(`@${userName} tentou recuperar a vida de seu próprio inimigo! Tamanha audacidade o fez perder metade de suas almas *-*`)
}

function recoverEnemieHP(battle: Battle, targetPlayer: string, userName: string): void {

    const enemieInstance = battle.getEnemie()
    enemieInstance.recoverHP()
    enemieInstance.addSouls(enemieInstance.getSouls())
    sendMessage(`/w ${targetPlayer} ${userName} acabou de restaurar a vida de seu inimigo!!!`)
    sendMessage(`${userName} restaurou a vida do inimigo de ${targetPlayer} durante sua batalha *-*`)
}
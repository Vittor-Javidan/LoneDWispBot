import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"

export default function startGame(userName: string): void {
    
    if(Player.isLogged(userName)) {
        sendMessage(`/w ${userName} você já está jogando`)
        return
    }

    const player = Player.startGame(userName)
    
    publicMessage(userName, player)
    
    SendMessage_UI.firePit(player, (`
        você acabou de iniciar ChatSouls, MUAHAHAHAH *-*. 
        Digitar: "!cs help" mostra opções da sua conta, "!cs" para se situar no game, 
        e apenas digite o número da opção para navegar dentro do jogo. 
        Você está descansando em uma fogueira. oque deseja fazer?
    `))
}

function publicMessage(userName: string, player: Player): void {

    let message = ''
    player.isNewPlayer
        ? message = `@${userName} acabou de se cadastrar em ChatSouls Muahaha *-*`
        : message = `@${userName} acabou de entrar em ChatSouls *-*`
    //

    sendMessage(`${message}. Lembre-se sempre de verificar se mensagens privadas com o canal está habilitada!`)
}
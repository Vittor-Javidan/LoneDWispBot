import sendMessage from "../../../Twitch/sendMessageHandler.js"
import Auction from "../Classes/Auction.js"

export default function sendPinMessage(): void {

    const auctions = Auction.getAuctionList()
    if(auctions.length <= 0){
        sendMessage(`Não há nenhum leilão ocorrendo no momento`)
        return
    }

    let message = `Leilões ativos: |`
    for(let i = 0; i < auctions.length; i++){
        message += `| ${auctions[i].getItemName()} |`
    }
    message += `| Utilize os pontos do canal para fazer lances e consultar ranks e resultados!`

    sendMessage(message)
}
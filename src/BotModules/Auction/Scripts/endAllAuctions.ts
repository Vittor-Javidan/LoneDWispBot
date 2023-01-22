import sendMessage from "../../../Twitch/sendMessageHandler.js"
import Auction from "../Classes/Auction.js"

export default function endAllAuctions(): void {
	
	Auction.clearAllAuctions()
	sendMessage(`Leilão finalizado com sucesso. Histórico de ganhadores deletado`)
}
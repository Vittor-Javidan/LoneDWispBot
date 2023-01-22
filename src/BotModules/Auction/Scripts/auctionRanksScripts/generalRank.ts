import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import { TwitchDataPayload } from "../../../../Twitch/types.js"
import Auction from "../../Classes/Auction.js"

export default function generalRank(data: TwitchDataPayload): void {

	const allAuctions = Auction.getAuctionList()
	const userName = data.userName
	const message = buildMessage(userName, allAuctions)

	sendMessage(message)
}

function buildMessage(userName: string, auctionsArray: Auction[]): string {

	let availableAuctions = ''

	//Iterate through all auctions instances
	for(let i = 0; i < auctionsArray.length; i++){

		const auction = auctionsArray[i]
		const itemName = auction.getItemName().toUpperCase()
		const timeLeft = auction.getSecondsLeft()
		const podium = auction.getRank()

		availableAuctions += `| ${i + 1}. ${itemName} -`
		
		if(podium.length === 0) {
			availableAuctions += `- Sem Lances |`
		}
		
		if(podium.length === 1) {
			if(timeLeft > 0) {
				availableAuctions += `- Rank 1: ${podium[0].name} ${podium[0].score} pontos |`
			} else if (podium[0] && timeLeft <= 0){
				availableAuctions += `- Ganhador: ${podium[0].name} ${podium[0].score} pontos |`
			}
		}

		if(podium.length > 1){
			if(podium[0].score === podium[1].score && timeLeft > 0) {
				availableAuctions += `- Empate: ${podium[0].name} e ${podium[1].name} ${podium[0].score} pontos |`
			} else if(timeLeft > 0) {
				availableAuctions += `- Rank 1: ${podium[0].name} ${podium[0].score} pontos |`
			} else if (timeLeft <= 0){
				availableAuctions += `- Ganhador: ${podium[0].name} ${podium[0].score} pontos |`
			}
		}

	}
	
	availableAuctions += `| Lembrando que ao vencer um leilão, é necessário coletar o prêmio ANTES QUE A LIVE ACABE!!!`

	return `@${userName}, CÓDIGOS DOS LEILÕES SÃO: |${availableAuctions}`
}
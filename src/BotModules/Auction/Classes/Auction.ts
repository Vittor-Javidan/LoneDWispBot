import sendMessage from "../../../Twitch/sendMessageHandler.js"
import { BidersArray, BidersLeaderboard, TimersSecondsLeft } from "../moduleTypes.js"

export default class Auction {

    static auctionsList: Auction[] = []
    static date = new Date()
    static timersList: TimersSecondsLeft = {}
    static mainTimer: NodeJS.Timer | undefined

    itemName: string
    secondsLeft: number
    regressiveTimer: NodeJS.Timer | undefined
    biders: BidersLeaderboard = {}

    constructor(itemName: string, minutes: number) {

		this.itemName = itemName.toUpperCase() 
        this.secondsLeft = minutes * 60
        this.regressiveTimer = setInterval(() => {
			
			if (this.getSecondsLeft() <= 0) {
				this.announceResults()
				this.stopTimer()
				return
			}
			
			Auction.registerSecondsLeft(this.getItemName(), this.getSecondsLeft())
			this.decreaseSecondsLeft(10)
			
		}, 10000) // runs every 10 seconds
	}

	// ==========================================================================================================
	// Class Methods ============================================================================================
	// ==========================================================================================================

    static init(itemName: string, minutes: number): Auction {

		const auction = new Auction(itemName, minutes)
		this.pushToAuctionList(auction)
		this.startMainTimer()

		return auction
    }

    static getAuctionList(): Auction[] {
		return this.auctionsList
	}

    static pushToAuctionList(auction: Auction): void {
		this.auctionsList.push(auction)
	}

    static clearAuctionList(): void {
		this.auctionsList = []
	}

    static getInstanceByCode(itemCode: number): Auction {

		const index = itemCode - 1
		return  this.getAuctionList()[index]
	}

    static isItemBeingAuctioned(itemName: string): boolean {
		for(let i = 0; i < this.getAuctionsAmount(); i++){
			if(itemName.toUpperCase() === this.getAuctionList()[i].getItemName()) {
				return true
			}
		}
		return false
	}

    static getAuctionsAmount(): number{
		return this.getAuctionList().length
	}

    static clearAllAuctions(): void {

		for(let i = 0; i < this.getAuctionsAmount(); i++){
			this.getAuctionList()[i].stopTimer()
			this.getAuctionList()[i].deleteTimer()
		}

		this.clearMainTimer()
		this.clearSecondsLeft()
		this.clearAuctionList()
	}

    static getDateAndTime(): string{
		return (
			`Dia: ${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}, 
			Hora: ${this.date.getHours()}:${this.date.getMinutes()}`
		)
	}

    static registerSecondsLeft(itemName: string, secondsLeft: number): void {
		this.timersList[itemName] = secondsLeft
	}

	static retrieveSecondsLeft(): TimersSecondsLeft {
		return this.timersList
	}

	static clearSecondsLeft(): void {
		this.timersList = {}
	}

    static startMainTimer(): void {

        if(this.getAuctionsAmount() > 1) {
            return
        }

		const seconds = 10

		this.mainTimer = setInterval(() => {
			this.mainTimeAlertMessage()
		}, seconds * 1000)
	}

    static clearMainTimer(): void {
		clearInterval(this.mainTimer)
		this.mainTimer = undefined
	}

    static mainTimeAlertMessage(): void {

		let message = `Minutos restantes : |`
		let count = 0

		for (const item in this.timersList) {

			const timeLeft = this.timersList[item]
			const itemName = item

			if(
				((
					timeLeft % (10 * 60) === 0	
				) || (
					timeLeft % (1 * 60) === 0 	&& 
					timeLeft <= (5 * 60)
				)) && timeLeft > 0
			) {
			   message += `| ${itemName}: ${timeLeft/60} |`
			   count++
			}
		}
		message += `| Caso queira saber como o evento funciona, é só me perguntar!!! (づ｡◕‿‿◕｡)づ ✧`

		if(count <= 0) return
		sendMessage(message)
	}

	// ==========================================================================================================
	// Instance Methods =========================================================================================
	// ==========================================================================================================

	getItemName(): string {
		return this.itemName
	}

    setItemName(itemName: string): void {
		this.itemName = itemName.toUpperCase()
	}

	getSecondsLeft(): number {
		return this.secondsLeft
	}
	
	setSecondsLeft(seconds: number): void {
		this.secondsLeft = seconds
	}

    addSecondsLeft(seconds: number): void {
		this.secondsLeft += seconds
	}


    decreaseSecondsLeft(seconds: number): void {
		this.secondsLeft -= seconds
	}

    setMinutes(minutes: number): void {
		this.secondsLeft = minutes * 60
	}

    addExtraMinutes(minutes: number): void {
		this.secondsLeft += minutes * 60
	}

    getRegressiveTimer(): NodeJS.Timer | undefined {
		return this.regressiveTimer
	}

	stopTimer(): void {
		clearInterval(this.getRegressiveTimer())
	}

	deleteTimer(): void {
		this.regressiveTimer = undefined
	}

	getBiders(): Record<string, number> {
		return this.biders
	}

	registerBider(userName: string, bidValue: number): void {
		this.biders[userName] = bidValue
	}

	increaseBiderTotalScore(userName: string, bidValue: number): void {
		this.biders[userName] += bidValue
	}

	isBiderRegistered(userName: string): boolean {
		return this.biders.hasOwnProperty(userName)
	}

    isAuctionFinished(): boolean {
		if(this.getSecondsLeft() <= 0) return true
		return false
	}

    bid(bid: {userName: string, bidValue: number}): void  {
		
		if (!this.isBiderRegistered(bid.userName)) {

			this.registerBider(bid.userName, bid.bidValue)
			this.addExtraTimeOnFinalMinutes(bid.userName)
			return
		}

		this.increaseBiderTotalScore(bid.userName, bid.bidValue)
		this.addExtraTimeOnFinalMinutes(bid.userName)
	}

    getRank(): BidersArray {

		const itemRank = []
		const participants = this.getBiders()
		
		//Pushes each participant into an array
		for (const name in participants) {
			itemRank.push({
				name: name,
				score: participants[name],
			})
		}

		//Descendent sort
		itemRank.sort((a, b) => { return b.score - a.score })

		return itemRank
	}

	addExtraTimeOnFinalMinutes(userName: string): void{

		const secondsLeft = this.getSecondsLeft()
		const itemName = this.getItemName()
		const extraMinutes = 2

		if((
			this.isDraw(userName) 		||
			this.isNewWinner(userName) 	||
			this.isFirstBidder(userName)

		) && secondsLeft <= 60) {

			this.addExtraMinutes(extraMinutes)
			sendMessage(`${itemName}: 2 minutos adicionados.`)
		}
	}

	isDraw(userName: string): boolean{

		const podium = this.getRank()

		if(	podium.length > 1 && 
			(
				userName === podium[0].name	||
				userName === podium[1].name
			) 
			&& podium[0].score === podium[1].score 
		){
			sendMessage(`${this.getItemName()}: @${podium[0].name} e @${podium[1].name} empataram com ${podium[0].score} pontos. Em caso de empate apenas a casa ganha! BEM VINDO AO LEILÃO MUAHAHA *-*`)
			return true
		}
		return false
	}

	isNewWinner(userName: string): boolean{

		const podium = this.getRank()

		if( podium.length > 1 && 
			(
				userName === podium[0].name &&
				podium[0].score > podium[1].score
			)
		){
			sendMessage(`${this.getItemName()}: Nova Melhor pontuação, @${podium[0].name} com ${podium[0].score} pontos.`)
			return true
		}
		return false
	}

	isFirstBidder(userName: string): boolean{

		const podium = this.getRank()

		if(podium.length > 1){
			return false
		}
		
		sendMessage(`${this.getItemName()}: Primeiro lance, @${userName} com ${podium[0].score} pontos.`)
		return true
	}

    announceResults(): void {

		this.ifNoBiderResult()
		this.ifOneBiderResult()
		this.ifDrawResult()
		this.ifNormalWinnerResult()
	}

	ifNoBiderResult(): void {

		const podium = this.getRank()

		if (podium.length <= 0) {

			sendMessage(`${this.getItemName()}: não houve lances...`)
		}
	}

	ifOneBiderResult(): void {

		const podium = this.getRank()

		if (podium.length === 1) {

			const winner = podium[0].name
			const score = podium[0].score
			const itemName = this.getItemName()
			sendMessage(`${itemName}: ganhador é @${winner} com ${score} pontos`)
			sendMessage(`/w @${winner} PARABÉNS!! Voce ganhou um ${itemName}. ${Auction.getDateAndTime()}. Você tem até o final da stream pra receber o prêmio!`)
		}
	}

	ifDrawResult(): void {

		const podium = this.getRank()

		if (
			podium.length > 1 && 
			podium[0].score === podium[1].score
		) {
			sendMessage(`${this.getItemName()}: empate, sem ganhadores, a casa ganhou *-*`)
		}
	}

	ifNormalWinnerResult(): void {

		const podium = this.getRank()

		if (
			podium.length > 1 && 
			podium[0].score > podium[1].score
		) {

			const winner = podium[0].name
			const score = podium[0].score
			const itemName = this.getItemName()
			sendMessage(`${itemName}: ganhador é @${winner} com ${score} pontos`)	
			sendMessage(`/w @${winner} PARABÉNS!! Você ganhou um ${itemName}. ${Auction.getDateAndTime()}. Você tem até o final da stream pra receber o prêmio!`)
		}

	}
}

import sendMessage from "../../../Twitch/sendMessageHandler.js"

export default function giveURL(): void {

	sendMessage(
		`--   https://vittor-javidan.github.io/   --  Esse é meu website pessoal, 
		onde além de ser meu portifólio, também é um lugar onde eu guardo 
		link de vídeos e artigos sobre diversos assuntos de programação que já estudei
		e verifiquei que são de ótima qualidade. Se for um assunto que goste, 
		espero ter ajudado.`
	)
}
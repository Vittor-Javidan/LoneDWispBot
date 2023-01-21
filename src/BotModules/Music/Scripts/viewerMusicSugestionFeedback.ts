import sendMessage from "../../../Twitch/sendMessageHandler.js";

export default function viewerMusicSugestion(userName: string): void {
	sendMessage(
		`/w ${userName} Assim que possível eu pessoalmente irei escutar sua música em off.
		Irei adiciona-la caso combine com a playlist do canal.`
	)
}
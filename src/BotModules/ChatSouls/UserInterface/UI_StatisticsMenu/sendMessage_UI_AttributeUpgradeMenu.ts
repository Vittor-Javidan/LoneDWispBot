import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"

export function sendMessage_UI_AttributeUpgradeMenu(playerInstance: Player, menuMessage: string): void {

	const playerName = playerInstance.getName()
	const level = playerInstance.getlevel()
	const souls = playerInstance.getSouls()
	const upgradeCost = playerInstance.getLevelUpgradeCost()

	sendMessage(
        `/w ${playerName} ${menuMessage} 
		| Seu Level: ${level} 
		| Suas Almas: ${souls} 
		| Custo Upgrade: ${upgradeCost} almas 
		| 0. Voltar 
		| 1. UP Vitalidade 
		| 2. UP Agilidade 
		| 3. UP Força 
		| 4. UP Inteligência 
		| 5. Descrições do bônus de cada atributo 
		|`
	)
	return
}

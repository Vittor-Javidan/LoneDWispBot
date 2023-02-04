import Emote from "../../../../Twitch/Emotes.js"
import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_AttributeTypes, CS_DataPayload } from "../../Globals/moduleTypes.js"

export default function UI_AttributeUpgradeMenu(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
    const player = data.playerInstance
    
	if (commandWord === '!cs') {
		SendMessage_UI.attributeUpgradeMenu(player, `Você está no menu de attributos`)
		return
	}

	const commandCode = Number(commandWord)
	switch(commandCode){
				
		case 0: Travel.to_StatisticsMenu(player, `Você voltou ao menu de estatísticas`)									;break
		case 1: _UI_Option.upgradeAttributeByType(player, "vitality", `${Emote._GivePLZ_} VITALIDADE AUMENTADA!`)		;break
		case 2: _UI_Option.upgradeAttributeByType(player, "agility", `${Emote._GivePLZ_} AGILIDADE AUMENTADA!`)			;break
        case 3: _UI_Option.upgradeAttributeByType(player, "strenght", `${Emote._GivePLZ_} FORÇA AUMENTADA!`)			;break
        case 4: _UI_Option.upgradeAttributeByType(player, "intelligence", `${Emote._GivePLZ_} INTELIGÊNCIA AUMENTADA!`)	;break
		case 5: _UI_Option.consultAttributesDescription(player)															;break

		default: SendMessage_UI.attributeUpgradeMenu(player, `Código inválido`)
	}
}

class _UI_Option {

	static consultAttributesDescription(player: Player): void {
    
		SendMessage_UI.attributeUpgradeMenu(player,
			`O bônus de cada um dos atributos são: 
			Vitalidade: +HP, 
			Agilidade: +evasão, 
			Força: +dano/resistência física,
			Inteligência: +dano/resistência mágica`
		)
	}

	static upgradeAttributeByType(
		player: Player, 
		attribute: CS_AttributeTypes, 
		menuMessage: string
	): void {
	 
		if(_UI.notEnoughSoulsToLevelUp(player)) {
			_UI.notEnoughSoulsCase(player)
			return
		}
		_UI.enoughSoulsCase(player, attribute, menuMessage)
	}
}

class _UI {

	static notEnoughSoulsToLevelUp(player: Player): boolean {

		const souls = player.getSouls()
		const upgradeCost = player.getLevelUpgradeCost()
		const soulsBalance_AfterUpgrade = souls - upgradeCost
	
		if(soulsBalance_AfterUpgrade < 0 ) 
			return true
		return false
	}

	static notEnoughSoulsCase(player: Player) {
    
		SendMessage_UI.attributeUpgradeMenu(player,
			`Você não possui almas suficientes`
		)
	}

	static enoughSoulsCase(
		player: Player, 
		attribute: CS_AttributeTypes, 
		menuMessage: string
	): void {
		
		player.upgradeAttributeProcessHandler(attribute)
		
		const playerName = player.getName()
		const souls = player.getSouls()
		const level = player.getlevel()
		const nextUpgradeCost = player.getLevelUpgradeCost()
	
		sendMessage(`@${playerName} upou para o nível ${level}!!`)
		
		SendMessage_UI.attributeUpgradeMenu(player,
			`${menuMessage} 
			- Novo level: ${level} 
			- Almas restantes: ${souls} 
			- custo próximo nível: ${nextUpgradeCost} `
		)
	}
}
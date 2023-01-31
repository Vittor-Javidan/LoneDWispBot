import SendMessage_UI from "../../Classes/SendMessage.js"
import Travel from "../../Classes/Travel.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"
import consultAttributesDescription from "../../UserInterface/UI_StatisticsMenu/consultAttributesDescription.js"
import upgradeAttributeByType from "../../UserInterface/UI_StatisticsMenu/upgradeAttributeByType.js"

export default function UI_AttributeUpgradeMenu(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
    const player = data.playerInstance
    
	if (commandWord === '!cs') {
		SendMessage_UI.attributeUpgradeMenu(player, `Você está no menu de attributos`)
		return
	}

	const commandCode = Number(commandWord)
	switch(commandCode){
				
		case 0: Travel.to_StatisticsMenu(player, `Você voltou ao menu de estatísticas`)		;break
		case 1: upgradeAttributeByType(player, "vitality", `VITALIDADE AUMENTADA!`)			;break
		case 2: upgradeAttributeByType(player, "agility", `AGILIDADE AUMENTADA!`)			;break
        case 3: upgradeAttributeByType(player, "strenght", `FORÇA AUMENTADA!`)				;break
        case 4: upgradeAttributeByType(player, "intelligence", `INTELIGÊNCIA AUMENTADA!`)	;break
		case 5: consultAttributesDescription(data, `O bônus de cada um dos atributos são:`)	;break

		default: SendMessage_UI.attributeUpgradeMenu(player, `Código inválido`)
	}
}
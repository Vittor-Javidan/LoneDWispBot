import { CS_DataPayload } from "../../Types/moduleTypes.js"
import consultAttributesDescription from "./consultAttributesDescription.js"
import { sendMessage_UI_AttributeUpgradeMenu } from "./sendMessage_UI_AttributeUpgradeMenu.js"
import to_StatisticsMenu from "./to_StatisticsMenu.js"
import upgradeAttributeByType from "./upgradeAttributeByType.js"

export default function UI_AttributeUpgradeMenu(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
    const player = data.playerInstance
    
	if (commandWord === '!cs') {
        sendMessage_UI_AttributeUpgradeMenu(data.playerInstance, `Você está no menu de attributos`)
		return
	}

	const commandCode = Number(commandWord)
	switch(commandCode){
				
		case 0: to_StatisticsMenu(player, `Você voltou ao menu de estatísticas`);           break
		case 1: upgradeAttributeByType(player, "vitality", `VITALIDADE AUMENTADA!`);        break
		case 2: upgradeAttributeByType(player, "agility", `AGILIDADE AUMENTADA!`);          break
        case 3: upgradeAttributeByType(player, "strenght", `FORÇA AUMENTADA!`);             break
        case 4: upgradeAttributeByType(player, "intelligence", `INTELIGÊNCIA AUMENTADA!`);  break
		case 5: consultAttributesDescription(data, `O bônus de cada um dos atributos são:`);break

		default: sendMessage_UI_AttributeUpgradeMenu(data.playerInstance, `Código inválido`)
	}
}
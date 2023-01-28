import { CS_DataPayload } from "../../Types/moduleTypes.js"
import { sendMessage_UI_AttributeUpgradeMenu } from "./sendMessage_UI_AttributeUpgradeMenu.js"

export default function consultAttributesDescription(data: CS_DataPayload, menuMessage: string): void {

    sendMessage_UI_AttributeUpgradeMenu(data.playerInstance,
        `${menuMessage} 
        Vitalidade: +HP, 
        Agilidade: +evasão, 
        Força: +dano/resistência física,
        Inteligência: +dano/resistência mágica`
    )
}
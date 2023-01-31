import SendMessage_UI from "../../Classes/SendMessage.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"

export default function consultAttributesDescription(data: CS_DataPayload, menuMessage: string): void {
    
    SendMessage_UI.attributeUpgradeMenu(data.playerInstance,
        `${menuMessage} 
        Vitalidade: +HP, 
        Agilidade: +evasão, 
        Força: +dano/resistência física,
        Inteligência: +dano/resistência mágica`
    )
}
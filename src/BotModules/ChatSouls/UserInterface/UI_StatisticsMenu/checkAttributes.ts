import { sendMessage_UI_StatisticsMenu } from "../../FrontEnd/sendMessage/sendMessage_UI_StatisticsMenu.js"
import { CS_DataPayload } from "../../Types/moduleTypes.js"


export default function consultAttributes(data: CS_DataPayload, menuMessage: string): void {

    const playerAttributes = data.playerInstance.getAttributes()
    const vitality = playerAttributes.vitality
    const agility = playerAttributes.agility
    const strenght = playerAttributes.strenght
    const intelligence = playerAttributes.intelligence
    
    sendMessage_UI_StatisticsMenu(data.playerInstance, 
        `${menuMessage}. Seus attributos:
        Vitalidade: ${vitality} 
        - Agilidade: ${agility} 
        - Força: ${strenght} 
        - Inteligência: ${intelligence}`
    )
}
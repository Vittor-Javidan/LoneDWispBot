import SendMessage_UI from "../../Classes/SendMessage.js"
import { CS_DataPayload } from "../../Globals/moduleTypes.js"


export default function consultAttributes(data: CS_DataPayload, menuMessage: string): void {

    const playerAttributes = data.playerInstance.getAttributes()
    const vitality = playerAttributes.vitality
    const agility = playerAttributes.agility
    const strenght = playerAttributes.strenght
    const intelligence = playerAttributes.intelligence
    
    SendMessage_UI.statisticsMenu(data.playerInstance, 
        `${menuMessage}. Seus attributos:
        Vitalidade: ${vitality} 
        - Agilidade: ${agility} 
        - Força: ${strenght} 
        - Inteligência: ${intelligence}`
    )
}
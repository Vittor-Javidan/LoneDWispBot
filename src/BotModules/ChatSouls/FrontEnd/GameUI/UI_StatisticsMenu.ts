import SendMessage_UI from "../../Classes/SendMessage.js";
import Travel from "../../Classes/Travel.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";

export default function UI_StatisticsMenu(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
    const player = data.playerInstance

	if (commandWord === '!cs') {
        SendMessage_UI.statisticsMenu(player, `Você está no menu de estatísticas`); return
    }

    const commandCode = Number(commandWord)
    switch (commandCode) {

        case 0: Travel.to_FirePit(player,                   `Você voltou a fogueira`)                       ;break
        case 1: _UI_Option.consultAttributes(data,           `Você ainda está no menu de estatísticas`)      ;break
        case 2: Travel.to_AttributeUpgradeMenu(player,      `Você está no menu de melhoria de attributos`)  ;break
        
        default: SendMessage_UI.statisticsMenu(player,      `Código inválido`);                             ;break
    }
}

class _UI_Option {

    public static consultAttributes(data: CS_DataPayload, menuMessage: string): void {

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
}

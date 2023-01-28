import to_FirePit from "../../backEnd/sendTo/to_FirePit.js";
import { sendMessage_UI_StatisticsMenu } from "../../FrontEnd/sendMessage/sendMessage_UI_StatisticsMenu.js";
import { CS_DataPayload } from "../../Types/moduleTypes.js";
import consultAttributes from "./checkAttributes.js";
import to_AttributeUpgradeMenu from "./to_AttributeUpgradeMenu.js";

export default function UI_StatisticsMenu(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
    const playerInstance = data.playerInstance

	if (commandWord === '!cs') {
        sendMessage_UI_StatisticsMenu(playerInstance, `Você está no menu de estatísticas`); return
    }

    const commandCode = Number(commandWord)
    switch (commandCode) {

        case 0: to_FirePit(playerInstance,                  `Você voltou a fogueira`)                       ;break
        case 1: consultAttributes(data,                     `Você ainda está no menu de estatísticas`)      ;break
        case 2: to_AttributeUpgradeMenu(playerInstance,     `Você está no menu de melhoria de attributos`)  ;break
        
        default: sendMessage_UI_StatisticsMenu(playerInstance, `Código inválido`);                          ;break
    }
}

import to_AttributeUpgradeMenu from "../../backEnd/sendTo/to_AttributeUpgradeMenu.js";
import to_FirePit from "../../backEnd/sendTo/to_FirePit.js";
import { CS_DataPayload } from "../../Types/moduleTypes.js";
import consultAttributes from "../../UserInterface/UI_StatisticsMenu/checkAttributes.js";
import { sendMessage_UI_StatisticsMenu } from "../sendMessage/sendMessage_UI_StatisticsMenu.js";

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

import Travel from "../../Classes/Travel.js";
import { CS_DataPayload } from "../../Globals/moduleTypes.js";
import consultAttributes from "../../UserInterface/UI_StatisticsMenu/checkAttributes.js";
import { sendMessage_UI_StatisticsMenu } from "../sendMessage/sendMessage_UI_StatisticsMenu.js";

export default function UI_StatisticsMenu(data: CS_DataPayload): void {

    const commandWord = data.message.split(" ")[0]
    const player = data.playerInstance

	if (commandWord === '!cs') {
        sendMessage_UI_StatisticsMenu(player, `Você está no menu de estatísticas`); return
    }

    const commandCode = Number(commandWord)
    switch (commandCode) {

        case 0: Travel.to_FirePit(player,                   `Você voltou a fogueira`)                       ;break
        case 1: consultAttributes(data,                     `Você ainda está no menu de estatísticas`)      ;break
        case 2: Travel.to_AttributeUpgradeMenu(player,      `Você está no menu de melhoria de attributos`)  ;break
        
        default: sendMessage_UI_StatisticsMenu(player,      `Código inválido`);                             ;break
    }
}

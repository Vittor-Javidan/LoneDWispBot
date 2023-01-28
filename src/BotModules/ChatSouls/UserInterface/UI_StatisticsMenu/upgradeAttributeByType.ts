import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"
import { CS_AttributeTypes } from "../../Types/moduleTypes.js"
import notEnoughSoulsToLevelUp from "./notEnoughSoulsToLevelUp.js"
import { sendMessage_UI_AttributeUpgradeMenu } from "./sendMessage_UI_AttributeUpgradeMenu.js"

export default function upgradeAttributeByType(
    player: Player, 
    attribute: CS_AttributeTypes, 
    menuMessage: string
): void {

    if(notEnoughSoulsToLevelUp(player)) {
        notEnoughSoulsCase(player)
        return
    }
    enoughSoulsCase(player, attribute, menuMessage)
}

function notEnoughSoulsCase(player: Player) {
    sendMessage_UI_AttributeUpgradeMenu(player,
        `Você não possui almas suficientes`
    )
}

function enoughSoulsCase(
    player: Player, 
    attribute: CS_AttributeTypes, 
    menuMessage: string
): void {
    
    player.upgradeAttributeProcessHandler(attribute)
    
    const playerName = player.getName()
    const souls = player.getSouls()
    const level = player.getlevel()
    const nextUpgradeCost = player.getLevelUpgradeCost()

    sendMessage(`@${playerName} upou para o nível ${level}!!`)
    sendMessage_UI_AttributeUpgradeMenu(player,
        `${menuMessage} 
        - Novo level: ${level} 
        - Almas restantes: ${souls} 
        - custo próximo nível: ${nextUpgradeCost} `
    )
}

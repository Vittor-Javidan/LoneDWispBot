import sendMessage from "../../../../Twitch/sendMessageHandler.js"
import Player from "../../Classes/EntityChilds/Player.js"
import SendMessage_UI from "../../Classes/SendMessage.js"
import { CS_AttributeTypes } from "../../Globals/moduleTypes.js"
import notEnoughSoulsToLevelUp from "./notEnoughSoulsToLevelUp.js"

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
    
    SendMessage_UI.attributeUpgradeMenu(player,
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
    
    SendMessage_UI.attributeUpgradeMenu(player,
        `${menuMessage} 
        - Novo level: ${level} 
        - Almas restantes: ${souls} 
        - custo próximo nível: ${nextUpgradeCost} `
    )
}

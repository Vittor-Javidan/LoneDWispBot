import Player from "../../Classes/EntityChilds/Player.js"

export default function notEnoughSoulsToLevelUp(player: Player): boolean {

    const souls = player.getSouls()
	const upgradeCost = player.getLevelUpgradeCost()
	const soulsBalance_AfterUpgrade = souls - upgradeCost

    if(soulsBalance_AfterUpgrade < 0 ) 
        return true
    return false
}
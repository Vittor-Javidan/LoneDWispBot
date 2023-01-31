import Player from "../../Classes/EntityChilds/Player.js";

export default function returnInventoryEquipmentStringWithCodes(player: Player): string {

    const equipmentype = player.getCurrentState().secondary.split(" ")[0]
        
    switch(equipmentype) {
        
        case "longRangeWeapon": return player.getAllEquipmentInventoryString("longRangeWeapon") 
        case "meleeWeapon":     return player.getAllEquipmentInventoryString("meleeWeapon")     
        case "helmet":          return player.getAllEquipmentInventoryString("helmet")          
        case "bodyArmor":       return player.getAllEquipmentInventoryString("bodyArmor")       
        case "gloves":          return player.getAllEquipmentInventoryString("gloves")          
        case "boots":           return player.getAllEquipmentInventoryString("boots")           

        default: throw Error(`ERROR: "sendMessage_UI_EquipmentTypeInventoryMenu": 
            Secondary state do not contain a equipment type included
        `)
    }
}
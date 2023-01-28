import { getBoots_Description } from "../../database/equipment/descriptions.js"
import { getBoots_Multipliers } from "../../database/equipment/multipliers.js"
import { CS_BootsData } from "../../Types/moduleTypes.js"
import Armor from "./Armor.js"

export default class Boots extends Armor {

    equipmentData: CS_BootsData

    constructor(boots: CS_BootsData){
        
        super()
        this.equipmentData = boots
        this.multipliers = getBoots_Multipliers(boots.name)
    }

    detailsString(): string {

        const description = getBoots_Description(this.equipmentData.name)
        return super.detailsString(description)
    }
}
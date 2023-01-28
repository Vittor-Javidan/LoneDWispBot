import { getBodyArmor_Description } from "../../database/equipment/descriptions.js"
import { getBodyArmor_Multipliers } from "../../database/equipment/multipliers.js"
import { CS_BodyArmorData } from "../../Types/moduleTypes.js"
import Armor from "./Armor.js"

export default class BodyArmor extends Armor {

    equipmentData: CS_BodyArmorData

    constructor(bodyArmor: CS_BodyArmorData){
        
        super()
        this.equipmentData = bodyArmor
        this.multipliers = getBodyArmor_Multipliers(bodyArmor.name)
    }

    detailsString(): string {

        const description = getBodyArmor_Description(this.equipmentData.name)
        return super.detailsString(description)
    }
}

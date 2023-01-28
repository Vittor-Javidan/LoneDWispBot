import { getGloves_Description } from "../../database/equipment/descriptions.js"
import { getGloves_Multipliers } from "../../database/equipment/multipliers.js"
import { CS_GlovesData } from "../../Globals/moduleTypes.js"
import Armor from "./Armor.js"

export default class Gloves extends Armor {

    equipmentData: CS_GlovesData

    constructor(gloves: CS_GlovesData){
        
        super()
        this.equipmentData = gloves
        this.multipliers = getGloves_Multipliers(gloves.name)
    }

    detailsString(): string {

        const description = getGloves_Description(this.equipmentData.name)
        return super.detailsString(description)
    }
}
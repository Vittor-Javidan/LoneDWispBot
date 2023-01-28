import { getLongRange_Description } from "../../database/equipment/descriptions.js"
import { getLongRange_Multipliers } from "../../database/equipment/multipliers.js"
import { CS_LongRangeData } from "../../Globals/moduleTypes.js"
import Weapon from "./Weapon.js"

export default class LongRangeWeapon extends Weapon {

    equipmentData: CS_LongRangeData

    constructor(longRange: CS_LongRangeData){
        
        super()
        this.equipmentData = longRange
        this.multipliers = getLongRange_Multipliers(longRange.name)
    }

    detailsString(): string {

        const description = getLongRange_Description(this.equipmentData.name)
        return super.detailsString(description)
    }
}
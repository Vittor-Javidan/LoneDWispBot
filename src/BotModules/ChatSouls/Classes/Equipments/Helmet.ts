import { getHelmet_Description } from "../../database/equipment/descriptions.js"
import { getHelmet_Multipliers } from "../../database/equipment/multipliers.js"
import { CS_HelmetData } from "../../Types/moduleTypes.js"
import Armor from "./Armor.js"

export default class Helmet extends Armor {

    equipmentData: CS_HelmetData

    constructor(helmet: CS_HelmetData){
        
        super()
        this.equipmentData = helmet
        this.multipliers = getHelmet_Multipliers(helmet.name)
    }

    detailsString(): string {

        if(this.equipmentData.type !== "helmet") {
            throw Error(`ERROR: Helmet class "detailsString": the given equipmentData has the wrong equipment type.`)
        }
        
        const description = getHelmet_Description(this.equipmentData.name)
        return super.detailsString(description)
    }
}
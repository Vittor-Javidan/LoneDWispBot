import { getMelee_Description } from "../../database/equipment/descriptions.js"
import { getMelee_Multipliers } from "../../database/equipment/multipliers.js"
import { CS_MeleeData } from "../../Types/moduleTypes.js"
import Weapon from "./Weapon.js"

export default class MeleeWeapon extends Weapon {

    equipmentData: CS_MeleeData

    constructor(melee: CS_MeleeData) {

        super()
        this.equipmentData = melee
        this.multipliers = getMelee_Multipliers(melee.name)
    }

    detailsString(): string {

        const description = getMelee_Description(this.equipmentData.name)
        return super.detailsString(description)
    }
}

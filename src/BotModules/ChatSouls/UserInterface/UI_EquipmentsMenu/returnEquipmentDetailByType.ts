import BodyArmor from "../../Classes/Equipments/BodyArmor.js";
import Boots from "../../Classes/Equipments/Boots.js";
import Gloves from "../../Classes/Equipments/Gloves.js";
import Helmet from "../../Classes/Equipments/Helmet.js";
import LongRangeWeapon from "../../Classes/Equipments/LongRangeWeapon.js";
import MeleeWeapon from "../../Classes/Equipments/MeleeWeapon.js";
import { CS_EquipmentData } from "../../Globals/moduleTypes.js";

export default function returnEquipmentDetails(currentEquipment: CS_EquipmentData) {

    let detailsString = undefined

    switch(currentEquipment.type) {
        
        case "longRangeWeapon": detailsString = new LongRangeWeapon(currentEquipment).detailsString()   ;break
        case "meleeWeapon":     detailsString = new MeleeWeapon(currentEquipment).detailsString()       ;break
        case "helmet":          detailsString = new Helmet(currentEquipment).detailsString()            ;break
        case "bodyArmor":       detailsString = new BodyArmor(currentEquipment).detailsString()         ;break
        case "gloves":          detailsString = new Gloves(currentEquipment).detailsString()            ;break
        case "boots":           detailsString = new Boots(currentEquipment).detailsString()             ;break

        default: throw Error(`ERROR: returnEquipmentDetailByType(): equipmentType not recognized`)
    }

    return detailsString
}
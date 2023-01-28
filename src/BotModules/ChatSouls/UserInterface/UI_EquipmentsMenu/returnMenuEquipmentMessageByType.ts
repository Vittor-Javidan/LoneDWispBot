import { CS_EquipmentTypes } from "../../Types/moduleTypes.js";

export default function returnMenuEquipmentMessageByType(equipmentType: CS_EquipmentTypes): string {

    let message = undefined

    switch(equipmentType) {

        case "longRangeWeapon": message = `Você voltou ao menu de armas longo alcance` ;break
        case "meleeWeapon":     message = `Você voltou ao menu de armas corpo a corpo` ;break
        case "helmet":          message = `Você voltou ao menu de capacetes`           ;break
        case "bodyArmor":       message = `Você voltou ao menu de armaduras`           ;break
        case "gloves":          message = `Você voltou ao menu de luvas`               ;break
        case "boots":           message = `Você voltou ao menu de botas`               ;break

        default: throw Error(`ERROR: returnMenuMessageByType(): equipmentType not recognized`)
    }

    return message
}
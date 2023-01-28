import { CS_EquipmentData } from "../../Globals/moduleTypes.js"

export default function returnEquippingMessage(equipmentObject: CS_EquipmentData): string {
    return `Você equipou ${equipmentObject.name}`
}

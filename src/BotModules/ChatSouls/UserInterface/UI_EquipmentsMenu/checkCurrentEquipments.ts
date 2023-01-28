import { EQUIPMENT_TYPES_ARRAY } from "../../Globals/EQUIPMENTS_ENTRY.js";
import { CS_DataPayload, CS_Equipments } from "../../Types/moduleTypes.js";
import { sendMessage_UI_Equipments } from "./sendMessage_UI_Equipments.js";

export default function checkCurrentEquipments(data: CS_DataPayload, menuMessage: string): void {  

    const currentEquipments = data.playerInstance.getAllCurrentEquipments()

    if(isNaked(currentEquipments)) {
        sendMessage_UI_Equipments(data.playerInstance, `${menuMessage} - Você está completamente nu!! Shame on you`)
    }
    sendMessage_UI_Equipments(data.playerInstance, `${menuMessage} - ${buildMessage(currentEquipments)} `)
}

function isNaked(currentEquipments: CS_Equipments): boolean {

    let naked = true

    EQUIPMENT_TYPES_ARRAY.forEach(type => {
        if(currentEquipments[type].name !== "Empty") {
            naked = false
        }
    })

    return naked
}

function buildMessage(currentEquipments: CS_Equipments): string {

    let equipmentString = 'Atualmente você está equipando: '

    EQUIPMENT_TYPES_ARRAY.forEach(type => {
        if(currentEquipments[type].name !== "Empty") {
            equipmentString += `${currentEquipments[type].name}, `
        }
    })

    equipmentString = equipmentString.slice(0, -2)
    
    return equipmentString
}
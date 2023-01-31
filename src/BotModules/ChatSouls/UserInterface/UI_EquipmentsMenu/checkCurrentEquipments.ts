import SendMessage_UI from "../../Classes/SendMessage.js";
import { EQUIPMENT_TYPES_ARRAY } from "../../Globals/EQUIPMENTS_ENTRY.js";
import { CS_DataPayload, CS_Equipments } from "../../Globals/moduleTypes.js";

export default function checkCurrentEquipments(data: CS_DataPayload, menuMessage: string): void {  

    const currentEquipments = data.playerInstance.getAllCurrentEquipments()

    if(isNaked(currentEquipments)) {
        SendMessage_UI.equipments(data.playerInstance, `${menuMessage} - Você está completamente nu!! Shame on you`)
    }
    SendMessage_UI.equipments(data.playerInstance, `${menuMessage} - ${buildMessage(currentEquipments)} `)
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
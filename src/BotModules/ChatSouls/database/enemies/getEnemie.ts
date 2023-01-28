import { CS_Catalog_TestArea_Enemies, CS_Catalog_TheWoods_Enemies, CS_EntityData } from "../../Types/moduleTypes.js"
import { enemiesDataBase } from "./enemiesData.js"

export default function getEnemie(options: {
    mapArea: "testArea"
    enemieName: CS_Catalog_TestArea_Enemies,
} | {
    mapArea: "theWoods"
    enemieName: CS_Catalog_TheWoods_Enemies, 
}): CS_EntityData {
    
    const {enemieName, mapArea} = options

    switch(mapArea) {
        case "testArea": return enemiesDataBase["testArea"][enemieName]
        case "theWoods": return enemiesDataBase["theWoods"][enemieName]
    }
}
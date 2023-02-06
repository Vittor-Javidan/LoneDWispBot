import Player from "../Classes/EntityChilds/Player.js"
import { AREA_MAPS_ARRAY } from "./ENTRIES/AREA_MAPS_ENTRY.js"
import { ATTRIBUTES_ARRAY } from "./ENTRIES/ATTRIBUTES_ENTRY.js"
import { BUFFY_TYPES_ARRAY } from "./ENTRIES/BUFF_TYPES_ENTRY.js"
import { TEST_AREA_ENEMIES_ARRAY, THE_WOODS_ENEMIES_ARRAY } from "./ENTRIES/ENEMIES_ENTRY.js"
import {
    BODY_ARMOR_ARRAY,
    BOOTS_ARRAY,
    EQUIPMENT_TYPES_ARRAY,
    GENERIC_EQUIPMENTS_ARRAY,
    GLOVES_ARRAY,
    HELMET_ARRAY,
    LONG_RANGE_ARRAY, MELEE_ARRAY
} from "./ENTRIES/EQUIPMENTS_ENTRY.js"
import { BODY_ARMOR_HABILITIES_ARRAY, BOOTS_HABILITIES_ARRAY, GLOVES_HABILITIES_ARRAY, HELMET_HABILITIES_ARRAY, LONG_RANGE_HABILITIES_ARRAY, MELEE_HABILITIES_ARRAY } from "./ENTRIES/HABILITIES_ENTRY.js"
import { EQUIPMENTS_MENU_STATES_ARRAY, EQUIPMENT_INVENTORY_STATES_ARRAY, EXPLORING_STATES_ARRAY, FIRE_PIT_STATES_ARRAY } from "./ENTRIES/SECONDARY_STATES_ENTRY.js"

//=============================================================================================
// UI PAYLOAD TYPE ============================================================================
//=============================================================================================

export type CS_DataPayload = {
    playerInstance: Player,
    message: string
}

//=============================================================================================
// DATABASE TYPES =============================================================================
//=============================================================================================

export type CS_Database = Record<string, CS_EntityData>
export type CS_Database_Key = {
    Description: string
    key: number,
    dinamicKey: number,
}

export type CS_Database_AreaMaps = {
    "testArea": Record<CS_Catalog_TestArea_Enemies, CS_EntityData>,
    "theWoods": Record<CS_Catalog_TheWoods_Enemies, CS_EntityData>
}

export type CS_DataBase_Equipments = {
    longRangeWeapon: CS_DataBase_LongRange,
    meleeWeapon: CS_DataBase_MeleeWeapon,
    helmet: CS_DataBase_Helmet,
    bodyArmor: CS_DataBase_BodyArmor,
    gloves: CS_DataBase_Gloves,
    boots: CS_DataBase_Boots
}

export type CS_DataBase_LongRange = Record<CS_Catalog_LongRange, CS_LongRangeData>
export type CS_DataBase_MeleeWeapon = Record<CS_Catalog_Melee, CS_MeleeData>
export type CS_DataBase_Helmet = Record<CS_Catalog_Helmet, CS_HelmetData>
export type CS_DataBase_BodyArmor = Record<CS_Catalog_BodyArmor, CS_BodyArmorData>
export type CS_DataBase_Gloves = Record<CS_Catalog_Gloves, CS_GlovesData>
export type CS_DataBase_Boots = Record<CS_Catalog_Boots, CS_BootsData>

//=============================================================================================
// INVENTORY TYPES ============================================================================
//=============================================================================================

export type CS_Inventory = {
    equipments: CS_Inventory_Equipments,
    resources: CS_Inventory_Resources
}

export type CS_Equipments = {
    longRangeWeapon: CS_LongRangeData,
    meleeWeapon: CS_MeleeData,
    helmet: CS_HelmetData,
    bodyArmor: CS_BodyArmorData,
    gloves: CS_GlovesData,
    boots: CS_BootsData,
}

export type CS_Inventory_Equipments = {
    longRangeWeapon: CS_LongRangeInventory_Object,
    meleeWeapon: CS_MeleeInventory_Object,
    helmet: CS_HelmetInventory_Object,
    bodyArmor: CS_BodyArmorInventory_Object,
    gloves: CS_GlovesInventory_Object,
    boots: CS_BootsInventory_Object,
}

export type CS_HabilitiesSlots = {
    longRangeWeapon: CS_HabilitieData_LongRange,
    meleeWeapon: CS_HabilitieData_Melee,
    helmet: CS_HabilitieData_Helmet,
    bodyArmor: CS_HabilitieData_BodyArmor,
    gloves: CS_HabilitieData_Gloves,
    boots: CS_HabilitieData_Boots
}

export type CS_EquipmentInventory_Object = (
    CS_LongRangeInventory_Object | 
    CS_MeleeInventory_Object | 
    CS_HelmetInventory_Object | 
    CS_BodyArmorInventory_Object | 
    CS_GlovesInventory_Object | 
    CS_BootsInventory_Object
)

export type CS_LongRangeInventory_Object = {
    array: CS_LongRangeData[],
    type: "longRangeWeapon"
} 

export type CS_MeleeInventory_Object = {
    array: CS_MeleeData[],
    type: "meleeWeapon"
} 

export type CS_HelmetInventory_Object = {
    array: CS_HelmetData[],
    type: "helmet"
} 

export type CS_BodyArmorInventory_Object = {
    array: CS_BodyArmorData[],
    type: "bodyArmor"
} 

export type CS_GlovesInventory_Object = {
    array: CS_GlovesData[],
    type: "gloves"
}

export type CS_BootsInventory_Object = {
    array: CS_BootsData[],
    type: "boots"
}

export type CS_Inventory_Resources = Record<string, CS_ResourceData>

//=============================================================================================
// DATA TYPES =================================================================================
//=============================================================================================

export type CS_EntityData = {
    name: string,
    souls: number,
    level: number,
    attributes: CS_Attributes,
    equipment: CS_Equipments,
    habilities: CS_HabilitiesSlots,
    inventory: CS_Inventory
}

export type CS_Attributes = {
    vitality: number,
    agility: number,
    strenght: number,
    intelligence: number
}

export type CS_Weapon_Multipliers = {

    agility: number,
    strenght: number,
    fireDamage: number,
    iceDamage: number,
    thunderDamage: number,
    poisonDamage: number
}

export type CS_Armor_Multipliers = {

    agility: number,
    vitality: number,
    strenght: number,
    mana: number,
    fireDefense: number,
    iceDefense: number,
    thunderDefense: number,
    poisonDefense: number
}

export type CS_Stats = {
    
    hp: number,
    mana: number,
    evasion: number,
    accuracy: number,

    fisicalDamage: number,
    fireDamage: number,
    iceDamage: number,
    thunderDamage: number,
    poisonDamage: number,

    fisicalDefense: number,
    fireDefense: number,
    iceDefense: number,
    thunderDefense: number,
    poisonDefense: number
}

export type CS_EquipmentData = (
    CS_LongRangeData | 
    CS_MeleeData | 
    CS_HelmetData | 
    CS_BodyArmorData | 
    CS_GlovesData | 
    CS_BootsData
)

export type CS_LongRangeData = {
    name: CS_Catalog_LongRange, 
    type: "longRangeWeapon"
}

export type CS_MeleeData = {
    name: CS_Catalog_Melee,
    type: "meleeWeapon"
}

export type CS_HelmetData = {
    name: CS_Catalog_Helmet,
    type: "helmet"
}

export type CS_BodyArmorData = {
    name: CS_Catalog_BodyArmor,
    type: "bodyArmor"
}

export type CS_GlovesData = {
    name: CS_Catalog_Gloves,
    type: "gloves"
}

export type CS_BootsData = {
    name: CS_Catalog_Boots,
    type: "boots"
}

export type CS_HabilitieData = (
    CS_HabilitieData_LongRange |
    CS_HabilitieData_Melee |
    CS_HabilitieData_Helmet |
    CS_HabilitieData_BodyArmor |
    CS_HabilitieData_Gloves |
    CS_HabilitieData_Boots
)

export type CS_HabilitieData_LongRange = {
    name: CS_Catalog_Habilities_LongRange,
    type: "longRangeWeapon",
    rank: number
}

export type CS_HabilitieData_Melee = {
    name: CS_Catalog_Habilities_Melee,
    type: "meleeWeapon",
    rank: number
}

export type CS_HabilitieData_Helmet = {
    name: CS_Catalog_Habilities_Helmet,
    type: "helmet",
    rank: number
}

export type CS_HabilitieData_BodyArmor = {
    name: CS_Catalog_Habilities_BodyArmor,
    type: "bodyArmor",
    rank: number
}

export type CS_HabilitieData_Gloves = {
    name: CS_Catalog_Habilities_Gloves,
    type: "gloves",
    rank: number
}

export type CS_HabilitieData_Boots = {
    name: CS_Catalog_Habilities_Boots,
    type: "boots",
    rank: number
}

export type CS_ResourceData = {
    name: string,
    amount: number
    type: string
    description?: string,
    dropChance?: number
}

export type CS_BuffData = {
    name: CS_Catalog_Habilities,
    type: CS_BuffTypes,
    buffStats: CS_Stats,
    turns: number,
}

//=============================================================================================
// TYPES ======================================================================================
//=============================================================================================

export type CS_EquipmentTypes = typeof EQUIPMENT_TYPES_ARRAY[number]
export type CS_AttributeTypes = typeof ATTRIBUTES_ARRAY[number]
export type CS_BuffTypes = typeof BUFFY_TYPES_ARRAY[number]

//=============================================================================================
// STATES =====================================================================================
//=============================================================================================

export type CS_PlayerState = {
    primary: "FIRE_PIT",
    secondary: (
        CS_SecondaryState_FIRE_PIT |  
        CS_SecondaryStates_EQUIPMENT_INVENTORY | 
        CS_SecondaryState_EQUIPMENTS_MENU
    )
} | {
    primary: "EXPLORING",
    secondary: (
        CS_SecondaryState_EXPLORING | 
        CS_SecondaryStates_EQUIPMENT_INVENTORY | 
        CS_SecondaryState_EQUIPMENTS_MENU
    )
}

export type CS_SecondaryState_EXPLORING = typeof EXPLORING_STATES_ARRAY[number]
export type CS_SecondaryState_FIRE_PIT = typeof FIRE_PIT_STATES_ARRAY[number]
export type CS_SecondaryState_EQUIPMENTS_MENU = typeof EQUIPMENTS_MENU_STATES_ARRAY[number]
export type CS_SecondaryStates_EQUIPMENT_INVENTORY = typeof EQUIPMENT_INVENTORY_STATES_ARRAY[number]

//=============================================================================================
// CATALOGS ===================================================================================
//=============================================================================================

export type CS_Catalog_MapAreas = typeof AREA_MAPS_ARRAY[number]
export type CS_Catalog_TheWoods_Enemies = typeof THE_WOODS_ENEMIES_ARRAY[number]
export type CS_Catalog_TestArea_Enemies = typeof TEST_AREA_ENEMIES_ARRAY[number]

export type CS_Catalog_Habilities = (
    CS_Catalog_Habilities_LongRange |
    CS_Catalog_Habilities_Melee |
    CS_Catalog_Habilities_Helmet |
    CS_Catalog_Habilities_BodyArmor |
    CS_Catalog_Habilities_Gloves |
    CS_Catalog_Habilities_Boots
)
export type CS_Catalog_Habilities_LongRange = typeof LONG_RANGE_HABILITIES_ARRAY[number]
export type CS_Catalog_Habilities_Melee = typeof MELEE_HABILITIES_ARRAY[number]
export type CS_Catalog_Habilities_Helmet = typeof HELMET_HABILITIES_ARRAY[number]
export type CS_Catalog_Habilities_BodyArmor = typeof BODY_ARMOR_HABILITIES_ARRAY[number]
export type CS_Catalog_Habilities_Gloves = typeof GLOVES_HABILITIES_ARRAY[number]
export type CS_Catalog_Habilities_Boots = typeof BOOTS_HABILITIES_ARRAY[number]

export type CS_Catalog_GenericEquips = typeof GENERIC_EQUIPMENTS_ARRAY[number]
export type CS_Catalog_LongRange = typeof LONG_RANGE_ARRAY[number]
export type CS_Catalog_Melee     = typeof MELEE_ARRAY[number]
export type CS_Catalog_Helmet    = typeof HELMET_ARRAY[number]
export type CS_Catalog_BodyArmor = typeof BODY_ARMOR_ARRAY[number]
export type CS_Catalog_Gloves    = typeof GLOVES_ARRAY[number]
export type CS_Catalog_Boots     = typeof BOOTS_ARRAY[number]

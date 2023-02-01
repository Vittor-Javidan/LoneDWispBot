import Player from "../Classes/EntityChilds/Player.js"
import {
    BODY_ARMOR_ARRAY,
    BOOTS_ARRAY,
    EQUIPMENT_TYPES_ARRAY,
    GLOVES_ARRAY,
    HELMET_ARRAY,
    LONG_RANGE_ARRAY, MELEE_ARRAY
} from "./EQUIPMENTS_ENTRY.js"

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
// ENTITY TYPES ===============================================================================
//=============================================================================================

export type CS_PlayerState = {
    primary: "FIRE_PIT",
    secondary: (
        CS_SecondaryState_FIRE_PIT | 
        CS_SecondaryState_EQUIPMENTS_MENU | 
        CS_SecondaryStates_EQUIPMENT_INVENTORY | 
        CS_SecondaryState_EQUIPMENTS_MENU
    )
} | {
    primary: "EXPLORING",
    secondary: (
        CS_SecondaryState_EXPLORING | 
        CS_SecondaryState_EQUIPMENTS_MENU | 
        CS_SecondaryStates_EQUIPMENT_INVENTORY | 
        CS_SecondaryState_EQUIPMENTS_MENU
    )
}

export type CS_EntityData = {
    name: string,
    souls: number,
    level: number,
    attributes: CS_Attributes,
    equipment: CS_Equipments,
    inventory: CS_Inventory
}

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

    vitality: number,
    agility: number,
    strenght: number,
    fireDefense: number,
    iceDefense: number,
    thunderDefense: number,
    poisonDefense: number
}

export type CS_Stats = {
    
    hp: number,
    evasion: number,

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

export type CS_ResourceData = {
    name: string,
    amount: number
    type: string
    description?: string,
    dropChance?: number
}

//=============================================================================================
// TYPES ======================================================================================
//=============================================================================================

export type CS_EquipmentTypes = typeof EQUIPMENT_TYPES_ARRAY[number]
export type CS_AttributeTypes = (
    "vitality"                      |
    "agility"                       |
    "strenght"                      |
    "intelligence"
)
export type CS_Stats_Types = (
    "hp"                        |
    "evasion"                   |
    "fisicalDamage"             |
    "fisicalDefense"            |
    "magicalDamage"             |
    "magicalDefense"
)

//=============================================================================================
// STATES =====================================================================================
//=============================================================================================

export type CS_SecondaryState_EXPLORING = (
    "IDLE" | "BATTLE" | "FORAGING" | "TRAVEL" | "EQUIPMENT"  
)

export type CS_SecondaryState_FIRE_PIT = (
    "RESTING_ON_FIRE_PIT" | "STATS_MENU" | "ATRIBUTE_UPGRADE" | "EQUIPMENT"    
)

export type CS_SecondaryState_EQUIPMENTS_MENU =  (
    "longRangeWeapon menu"                      |
    "meleeWeapon menu"                          |
    "helmet menu"                               |
    "bodyArmor menu"                            |
    "gloves menu"                               |
    "boots menu"
)

export type CS_SecondaryStates_EQUIPMENT_INVENTORY = (
    "longRangeWeapon inventory"                         |
    "meleeWeapon inventory"                             |
    "helmet inventory"                                  |
    "bodyArmor inventory"                               |
    "gloves inventory"                                  |
    "boots inventory"
)

//=============================================================================================
// CATALOGS ===================================================================================
//=============================================================================================

export type CS_Catalog_MapAreas = "testArea" | "theWoods"

export type CS_Catalog_TheWoods_Enemies = (
    "Javali" | "Bandido" | "Lobo" | "Esqueleto"
)
export type CS_Catalog_TestArea_Enemies = (
    "Dummy Enemie"
)

export type CS_Catalog_GenericEquips = (
    "Dummy Equipment" | "Empty"
)

export type CS_Catalog_LongRange = typeof LONG_RANGE_ARRAY[number]
export type CS_Catalog_Melee     = typeof MELEE_ARRAY[number]
export type CS_Catalog_Helmet    = typeof HELMET_ARRAY[number]
export type CS_Catalog_BodyArmor = typeof BODY_ARMOR_ARRAY[number]
export type CS_Catalog_Gloves    = typeof GLOVES_ARRAY[number]
export type CS_Catalog_Boots     = typeof BOOTS_ARRAY[number]

# =============================================================================================
# KNOWN TYPE PROBLEMS ========================================================================
# =============================================================================================

## ENTITY CLASS
/*
    setCurrentEquipment()
    setInventoryEquipments()
    pushToInventory()

    All three are related to "CS_EquipmentData" type abstraction.
    the type is a union of specific subtypes:

    ```
        CS_LongRangeData 
        CS_MeleeData
        CS_HelmetData
        CS_BodyArmorData
        CS_GlovesData
        CS_BootsData    
    ```

    Same thing happens with "CS_Inventory_Equipments".

    Each one of these subtypes have a key "type", making impossible to cause an error when these 
    types are assigned to a specific weapon, armor, inventory slot. But typescript don't realize 
    that. 
    
    Only know way to get rid of the error until now is through a switch case
    . Until i find a way to tell typescript the code is safe, i prefer the duplication
    code inside each function, to not loose intelisense response, and leave as it is, 
    so i still have the flexibility when i increase the number equipment types.
*/
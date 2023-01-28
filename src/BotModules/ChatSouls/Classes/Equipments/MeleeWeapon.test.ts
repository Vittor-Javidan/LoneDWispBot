import { expect, test } from "vitest";
import { getMelee } from "../../database/equipment/data";
import { getMelee_Description } from "../../database/equipment/descriptions";
import MeleeWeapon from "./MeleeWeapon";

test(`detailsString
    - Should return the string with the equipment description
`, () => {

    const meleeData = getMelee("Dummy Equipment")
    const melee = new MeleeWeapon(meleeData)
    const meleeDescription = getMelee_Description(meleeData.name)
    const meleeDescriptionWordsArray = meleeDescription.split(" ")

    const retrievedString = melee.detailsString()
    const retrievedStringWordsArray = retrievedString.split(" ")

    meleeDescriptionWordsArray.forEach(word => {

        expect(retrievedStringWordsArray.includes(word)).toBe(true)
    })
})
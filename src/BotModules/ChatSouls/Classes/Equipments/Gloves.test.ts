import { expect, test } from "vitest";
import { getGloves } from "../../database/equipment/data";
import { getGloves_Description } from "../../database/equipment/descriptions";
import Gloves from "./Gloves";

test(`detailsString
    - Should return the string with the equipment description
`, () => {

    const glovesData = getGloves("Dummy Equipment")
    const gloves = new Gloves(glovesData)
    const glovesDescription = getGloves_Description(glovesData.name)
    const glovesDescriptionWordsArray = glovesDescription.split(" ")

    const retrievedString = gloves.detailsString()
    const retrievedStringWordsArray = retrievedString.split(" ")

    glovesDescriptionWordsArray.forEach(word => {

        expect(retrievedStringWordsArray.includes(word)).toBe(true)
    })
})
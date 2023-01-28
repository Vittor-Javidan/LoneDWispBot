import { expect, test } from "vitest";
import { getBoots } from "../../database/equipment/data";
import { getBoots_Description } from "../../database/equipment/descriptions";
import Boots from "./Boots";

test(`detailsString
    - Should return the string with the equipment description
`, () => {

    const bootsData = getBoots("Dummy Equipment")
    const boots = new Boots(bootsData)
    const bootsDescription = getBoots_Description(bootsData.name)
    const bootsDescriptionWordsArray = bootsDescription.split(" ")

    const retrievedString = boots.detailsString()
    const retrievedStringWordsArray = retrievedString.split(" ")

    bootsDescriptionWordsArray.forEach(word => {

        expect(retrievedStringWordsArray.includes(word)).toBe(true)
    })
})
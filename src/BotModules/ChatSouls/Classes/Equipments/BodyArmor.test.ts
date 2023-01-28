import { expect, test } from "vitest";
import { getBodyArmor } from "../../database/equipment/data";
import { getBodyArmor_Description } from "../../database/equipment/descriptions";
import BodyArmor from "./BodyArmor";

test(`detailsString
    - Should return the string with the equipment description
`, () => {

    const bodyArmorData = getBodyArmor("Dummy Equipment")
    const bodyArmor = new BodyArmor(bodyArmorData)
    const bodyArmorDescription = getBodyArmor_Description(bodyArmorData.name)
    const bodyArmorDescriptionWordsArray = bodyArmorDescription.split(" ")

    const retrievedString = bodyArmor.detailsString()
    const retrievedStringWordsArray = retrievedString.split(" ")

    bodyArmorDescriptionWordsArray.forEach(word => {

        expect(retrievedStringWordsArray.includes(word)).toBe(true)
    })
})
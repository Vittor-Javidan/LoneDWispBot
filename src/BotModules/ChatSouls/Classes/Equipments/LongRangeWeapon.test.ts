import { expect, test } from "vitest";
import { getLongRange } from "../../database/equipment/data";
import { getLongRange_Description } from "../../database/equipment/descriptions";
import LongRangeWeapon from "./LongRangeWeapon";

test(`detailsString
    - Should return the string with the equipment description
`, () => {

    const longRangeData = getLongRange("Dummy Equipment")
    const longRange = new LongRangeWeapon(longRangeData)
    const longRangeDescription = getLongRange_Description(longRangeData.name)
    const longRangeDescriptionWordsArray = longRangeDescription.split(" ")

    const retrievedString = longRange.detailsString()
    const retrievedStringWordsArray = retrievedString.split(" ")

    longRangeDescriptionWordsArray.forEach(word => {

        expect(retrievedStringWordsArray.includes(word)).toBe(true)
    })
})
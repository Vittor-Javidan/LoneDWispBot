import { expect, test } from "vitest";
import { getHelmet } from "../../database/equipment/data";
import { getHelmet_Description } from "../../database/equipment/descriptions";
import Helmet from "./Helmet";

test(`detailsString
    - Should return the string with the equipment description
`, () => {

    const helmetData = getHelmet("Dummy Equipment")
    const helmet = new Helmet(helmetData)
    const helmetDescription = getHelmet_Description(helmetData.name)
    const helmetDescriptionWordsArray = helmetDescription.split(" ")

    const retrievedString = helmet.detailsString()
    const retrievedStringWordsArray = retrievedString.split(" ")

    helmetDescriptionWordsArray.forEach(word => {

        expect(retrievedStringWordsArray.includes(word)).toBe(true)
    })
})
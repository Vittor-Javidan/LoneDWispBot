import { expect, test } from "vitest";
import Armor from "./Armor";

test(`detailsString
    - Should return a string
`, () => {

    const armor = new Armor()
    expect(armor.detailsString('Fake Description')).toBeTypeOf("string")
})

test(`detailsString
    - Should have multipliers details
`, () => {

    const armor = new Armor()
    armor.multipliers = {
        vitality: 1,
        agility: 2,
        strenght: 3,
        intelligence: 4
    }

    const retrievedString = armor.detailsString('Fake Description')
    const wordsArray = retrievedString.split(" ")

    expect(wordsArray.includes("1x")).toBe(true)
    expect(wordsArray.includes("2x")).toBe(true)
    expect(wordsArray.includes("3x")).toBe(true)
    expect(wordsArray.includes("4x")).toBe(true)
})

test(`detailsString
    - Should include the description into the string
`, () => {

    const armor = new Armor()
    const retrievedString = armor.detailsString('Fake Description')
    const wordsArray = retrievedString.split(" ")

    expect(wordsArray.includes("Fake")).toBe(true)
    expect(wordsArray.includes("Description")).toBe(true)
})
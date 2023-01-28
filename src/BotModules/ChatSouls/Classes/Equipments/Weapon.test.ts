import { expect, test } from "vitest";
import Weapon from "./Weapon";

test(`detailsString
    - Should return a string
`, () => {

    const weapon = new Weapon()
    expect(weapon.detailsString('Fake Description')).toBeTypeOf("string")
})

test(`detailsString
    - Should have multipliers details
`, () => {

    const weapon = new Weapon()
    weapon.multipliers = {
        vitality: 1,
        agility: 2,
        strenght: 3,
        intelligence: 4
    }

    const retrievedString = weapon.detailsString('Fake Description')
    const wordsArray = retrievedString.split(" ")

    expect(wordsArray.includes("1x")).toBe(true)
    expect(wordsArray.includes("2x")).toBe(true)
    expect(wordsArray.includes("3x")).toBe(true)
    expect(wordsArray.includes("4x")).toBe(true)
})

test(`detailsString
    - Should include the description into the string
`, () => {

    const weapon = new Weapon()
    const retrievedString = weapon.detailsString('Fake Description')
    const wordsArray = retrievedString.split(" ")

    expect(wordsArray.includes("Fake")).toBe(true)
    expect(wordsArray.includes("Description")).toBe(true)
})
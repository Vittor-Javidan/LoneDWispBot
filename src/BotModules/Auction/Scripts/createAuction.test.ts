import { describe, expect, it } from 'vitest'
import Auction from '../Classes/Auction'
import createAuction from './createAuction'

describe(`createAuction`, () => {

    /*INTENTION
        to create auction when the command
        "!leilão create <itemName> <minutes>"
        is recognized
    */

    it(`Should create an auction when command is recognized`, () => {

        //Instantiation
        const itemName = `fakeItem`
        const minutes = 30
        const message = `!leilão create ${itemName} ${minutes}`

        //Run
        createAuction(message)

        //Tests
        const auction = Auction.getInstanceByCode(1)
        expect(auction.getItemName()).toBe(itemName.toUpperCase())
        expect(auction.getSecondsLeft()).toBeLessThanOrEqual(30 * 60)

        //Sanitizers
        Auction.clearAllAuctions()
    })
})
import { describe, expect, it } from 'vitest'
import Auction from '../Classes/Auction'
import createManyAuctions from './createManyAuctions'

describe(`createManyAuctions`, () => {

    /*INTENTION
        to create many auctions when the command
        "!leilão create_many <minutes> <itemName_1> <itemName_2> ... <itemName_N>"
        is recognized
    */

    it(`Should create many auctions`, () => {

        //Instantiation
        const minutes = 30
        const itemNames = [`FakeItem_1`, `FakeItem_2`, `FakeItem_3`]
        const message = `!leilão create_many ${minutes} ${itemNames[0]} ${itemNames[1]} ${itemNames[2]}`

        //Run
        createManyAuctions(message)

        //Tests
        const auctions = Auction.getAuctionList()
        auctions.forEach((auction, index) => {
            expect(auction.getItemName()).toBe(itemNames[index].toUpperCase())
            expect(auction.getSecondsLeft()).toBeLessThanOrEqual(minutes * 60)
        })

        //Sanitizer
        Auction.clearAllAuctions()
    })
})
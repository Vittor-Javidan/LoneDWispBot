import { describe, expect, it } from 'vitest'
import Auction from '../Classes/Auction'
import createAuction from './createAuction'
import setAuctionTimeLeft from './setAuctionTimeLeft'

describe(`setAuctionTimeLeft`, () => {

    /*INTENTION
        to set the timeLeft of a specific item
        by sending the command:
        "!leilão time_left <itemCode> <minutes>"
        is recognized
    */

    it(`Should set the secondsLeft of an auction`, () => {

        //Instantiation
        const itemName = `fakeItem`
        const minutes = 30
        const itemCode = 1
        const message = `!leilão time_left ${itemCode} ${minutes}`
        
        //Setup
        createAuction(`!leilão create ${itemName} 60`)

        //Run
        setAuctionTimeLeft(message)

        //Test
        const auction = Auction.getAuctionList()[0]
        expect(auction.getSecondsLeft()).toBeLessThanOrEqual(minutes * 60)

        //Sanitizers
        Auction.clearAllAuctions()
    })
})

import { describe, expect, it } from 'vitest'
import env from '../../../env'
import { TwitchDataPayload } from '../../../Twitch/types'
import auctionChatListeners from '../chatListenerHandler'
import Auction from '../Classes/Auction'
import createManyAuctions from './createManyAuctions'

describe(`endAllAuctions`, () => {

    /*INTENTION
        to create auction when the command
        "!leilão end_all"
        is recognized
    */

    it(`Should end all auctions`, () => {

        /* Details
            Because "endAllAuctions" accepts no arguments,
            the only way to access is through "auctionChatListeners".
        */

        //Instantiation
        const minutes = 30
        const itemNames = [`FakeItem_1`, `FakeItem_2`, `FakeItem_3`]
        const createManyCommand = `!leilão create_many ${minutes} ${itemNames[0]} ${itemNames[1]} ${itemNames[2]}`
        const data: TwitchDataPayload = {
            userName: env.TWITCH.BROADCASTER_NAME,
            message: `!leilão end_all`
        }

        //Setup
        createManyAuctions(createManyCommand)

        //Run
        auctionChatListeners(data)

        //Test
        const auction = Auction.getAuctionList()
        expect(auction.length).toBe(0)
    })
})
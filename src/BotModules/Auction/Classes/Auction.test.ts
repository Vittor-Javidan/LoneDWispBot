import { describe, expect, it } from 'vitest'
import Auction from './Auction.js'

describe(`Auction class`, () => {

    describe(`Class Methods`, () => classMethods())
    describe(`Instance Methods`, () => instanceMethods())


})

function classMethods(): void {

    describe(`init`, () => {

        /* INTENTION
            to initialize the auction
        */

        it(`Should return an auction instance`, () => {
            
            /*Detail
                1 - The auction instance must have a name
                2 - seconds left defined
                3 - timer already started
            */

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Tests
            expect(auction.getItemName()).toBe(itemName.toUpperCase()) //1
            expect(auction.getSecondsLeft()).toBe(60)
            expect(auction.getRegressiveTimer()).toBeDefined()

            //Sanitizers
            Auction.clearAllAuctions()
        })
    })

    describe(`getAuctionList`, () => {

        /* INTENTION
            to retrieve the list of all 
            started auctions
        */

        it(`Should get auction list instances`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            Auction.init(itemName, minutes)

            //Run
            const auctionList = Auction.getAuctionList()

            //Tests
            const auctionListKeys = Object.keys(auctionList)
            auctionListKeys.forEach(index => {
                //Keys should be a number if this object is an array
                expect(Number(index)).toBeTypeOf('number')
                expect(Number(index)).not.toBeNaN()
            })
            auctionList.forEach(auction => {
                //Values should be auctions instances
                expect(auction).toBeInstanceOf(Auction)
            })

            //Sanitizers
            Auction.clearAllAuctions()
        })
    })

    describe(`pushToAuctionList`, () => {

        /* INTENTION
            to push an auction instance inside the
            auction list
        */

        it(`Should push an auction instance inside "auctionsList"`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = new Auction(itemName, minutes)

            //Run
            Auction.pushToAuctionList(auction)

            //Test
            const auctionList = Auction.getAuctionList()
            expect(auctionList[0].getItemName()).toBe(itemName.toLocaleUpperCase())

            //Sanitizers
            Auction.clearAllAuctions()
        })
    })

    describe(`clearAuctionList`, () => {

        /* INTENTION
            to clear the auction list
        */
       
        it(`Should clear the auction list`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1

            //Setup
            const auction = Auction.init(itemName, minutes)

            //Run
            Auction.clearAuctionList()

            //Test
            expect(Auction.getAuctionList().length).toBe(0)

            //Sanitizers
            Auction.clearMainTimer()
            Auction.clearAllAuctions()
        })
    })

    describe(`getInstanceByCode`, () => {

        /* INTENTION
            itemCode is what the user see on front-end.
            The itention is to convert the itemCode into
            a index, and the return the instance inside
            "auctionsList"
        */

        it(`Should return auction instance by using a code`, () => {

            /*Details
                itemCode = index + 1
            */

            //Instantiation
            const itemName_1 = "Fake Item 1"
            const itemName_2 = "Fake Item 2"
            const minutes = 1

            //Setup
            Auction.init(itemName_1, minutes)
            Auction.init(itemName_2, minutes)

            //Run
            const auction_1 = Auction.getInstanceByCode(1)
            const auction_2 = Auction.getInstanceByCode(2)

            //Test
            expect(auction_1.getItemName()).toBe(itemName_1.toLocaleUpperCase())
            expect(auction_2.getItemName()).toBe(itemName_2.toLocaleUpperCase())

            //Sanitizers
            Auction.clearAllAuctions()
        })
    })

    describe(`isBeingAlreadyAuctioned`, () => {

        /* INTENTION
            to check if there is already an item with
            exacly same name being auctioned.
        */

        it(`Should return a "True" if there is already an item with same name, "False" otherwise`, () => {

            //Instantiation
            const itemName_1 = "Fake Item 1"
            const itemName_2 = "Fake Item 2"
            const minutes = 1

            //Setup
            Auction.init(itemName_1, minutes)

            //Run
            const answer_1 = Auction.isItemBeingAuctioned(itemName_1)
            const answer_2 = Auction.isItemBeingAuctioned(itemName_2)

            //Test
            expect(answer_1).toBe(true)
            expect(answer_2).toBe(false)

            //Sanitizers
            Auction.clearAllAuctions()
        })
    })

    describe(`getAuctionsAmount`, () => {

        /* INTENTION
            to get the amount of auctions
            happening in the moment
        */

        it(`Should return the amount of auctions`, () => {

            //Instantiation
            const itemName_1 = "Fake Item 1"
            const minutes = 1

            //Setup
            Auction.init(itemName_1, minutes)

            //Run
            const amount = Auction.getAuctionsAmount()

            //Test
            expect(amount).toBe(1)

            //Sanitizers
            Auction.clearAllAuctions()
        })
    })

    describe(`clearAllAuctions`, () => {

        /* INTENTION
            to clean everything, making a hard reset
        */

        it(`Should clear everything`, () => {

            //Instantiation
            const itemName = "Fake Item 1"
            const minutes = 1

            //Setup
            Auction.init(itemName, minutes)

            //Run
            Auction.clearAllAuctions()

            //Test
            expect(Auction.auctionsList.length).toBe(0)
            expect(Auction.mainTimer).toBeUndefined()
            expect(Auction.timersList).toStrictEqual({})
        })
    })

    describe(`getDateAndTime`, () => {

        /* INTENTION
            to retrive a formated string, with date and time,
            to give the bider winner an receipt of the prize.
        */

        it(`Should return a string`, () => {

            //Run
            const currentDateAndTime = Auction.getDateAndTime()

            //Test
            expect(currentDateAndTime).toBeTypeOf('string')
        })
    })

    describe(`registerSecondsLeft`, () => {

        /* INTENTION
            to register and keep track of the seconds left of
            all items being auctioned.
        */

        it(`Should register the seconds left of an item`), () => {

            //Instantiation
            const itemName = "Fake Item 1"
            const secondsLeft = 60

            //Run
            Auction.registerSecondsLeft(itemName, secondsLeft)

            //Test
            expect(Auction.retrieveSecondsLeft()[itemName]).toBe(secondsLeft)

            //Sanitizer
            Auction.clearAllAuctions()
        }
    })

    describe(`retrieveSecondsLeft`, () => {

        /* INTENTION
            to retrivethe seconds left of
            all items being auctioned.
        */

        it(`Should retrive the seconds left of all items`, () => {

            //Instantiation
            const itemName_1 = "Fake Item 1"
            const itemName_2 = "Fake Item 2"
            const secondsLeft = 60

            //Setup
            Auction.registerSecondsLeft(itemName_1, secondsLeft)
            Auction.registerSecondsLeft(itemName_2, secondsLeft)

            //Run
            const secondsLeftObject = Auction.retrieveSecondsLeft()

            //Tests
            expect(secondsLeftObject[itemName_1]).toBe(secondsLeft)
            expect(secondsLeftObject[itemName_2]).toBe(secondsLeft)
        })
    })

    describe(`clearSecondsLeft`, () => {

        /* INTENTION
            to clear all seconds left of
            all items registered in the moment.
        */

        it(`Should clear the whole object`, () => {

            //Instantiation
            const itemName_1 = "Fake Item 1"
            const itemName_2 = "Fake Item 2"
            const secondsLeft = 60

            //Setup
            Auction.registerSecondsLeft(itemName_1, secondsLeft)
            Auction.registerSecondsLeft(itemName_2, secondsLeft)

            //Run
            Auction.clearSecondsLeft()

            //Test
            expect(Auction.retrieveSecondsLeft()).toStrictEqual({})
        })
    })

    describe(`startMainTimer`, () => {

        /* INTENTION
            to start a main timer, wich keep 
            checking time to time the times left of all 
            auctions happening in the moment, to alert biders
            about the time left of each auction when is needed
        */

        it(`Should start the main timer`, () => {

            //Run
            Auction.startMainTimer()

            //Test
            expect(Auction.mainTimer).toBeDefined()

            //Sanitizers
            Auction.clearAllAuctions()        
        })
    })

    describe(`clearMainTimer`, () => {

        /* INTENTION
            to clear and send the timer to
            the garbage collector
        */

        it(`Should clear the main timer`, () => {

            //Setup
            Auction.startMainTimer()

            //Run
            Auction.clearMainTimer()

            //Test
            expect(Auction.mainTimer).toBeUndefined()
        })
    })

    describe(`mainTimeAlertMessage`, () => {

        /* INTENTION
            to build and send a message during important
            moments in the auction.
            No need to test. It just build a string and
            send a message directly through twitchClient
        */

        it(``, () => {})
    })
}

function instanceMethods(): void {

    describe(`getItemName`, () => {

        /* INTENTION
            to get the name of the item that is
            being auctioned
        */

        it(`It should get the item name`, () => {
            
            //Instantiation
            const itemName = "Fake Item 1"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
    
            //Run
            const retrievedName = auction.getItemName()
    
            //Test
            expect(retrievedName).toBe(itemName.toLocaleUpperCase())
    
            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`setItemName`, () => {

        /* INTENTION
            to set the name of the item that is
            being auctioned
        */

        it(`Should set the item name`, () => {

            //Instantiation
            const itemName_1 = "Fake Item 1"
            const itemName_2 = "Fake Item 2"
            const minutes = 1
            const auction = Auction.init(itemName_1, minutes)
    
            //Run
            auction.setItemName(itemName_2)
    
            //Test
            expect(auction.getItemName()).toBe(itemName_2.toUpperCase())
    
            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`getSecondsLeft`, () => {

        /* INTENTION
            to get the seconds left of an item that is
            being auctioned
        */

        it(`Should get the seconds left`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            const secondsLeft = auction.getSecondsLeft()

            //Test
            expect(secondsLeft).toBe(1 * 60)

            //Sanititzer
            Auction.clearAllAuctions()
        })
    })

    describe(`setSecondsLeft`, () => {

        /* INTENTION
            to set the seconds left of an item that is
            being auctioned
        */

        it(`Should set the seconds left`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            auction.setSecondsLeft(300)

            //Test
            expect(auction.getSecondsLeft()).toBe(300)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`addSecondsLeft`, () => {

        /* INTENTION
            to add seconds left of an item that is
            being auctioned
        */

        it(`Should add seconds left to an item`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            auction.addSecondsLeft(60)

            //Test
            expect(auction.getSecondsLeft()).toBe(120)

            //Sanitizers
            Auction.clearAllAuctions()
        })
    })

    describe(`decreaseSecondsLeft`, () => {

        /* INTENTION
            to decrease the seconds left of an item that is
            being auctioned
        */

        it(`Should decrease the seconds left`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            auction.decreaseSecondsLeft(30)

            //Test
            expect(auction.getSecondsLeft()).toBe(30)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`setMinutes`, () => {

        /* INTENTION
            to set the seconds left of an item that is
            being auctioned using minutes format
        */

        it(`Should set the seconds left using minutes format`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            auction.setMinutes(5)

            //Test
            expect(auction.getSecondsLeft()).toBe(5 * 60)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`addExtraMinutes`, () => {

        /* INTENTION
            to add seconds left to an item that is
            being auctioned using minutes format
        */

        it(`Should add seconds left to an item using minutes format`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            auction.addExtraMinutes(9)

            //Test
            expect(auction.getSecondsLeft()).toBe(10 * 60)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`getRegressiveTimer`, () => {

        /* INTENTION
            to get the "setInterval" function, wich represents
            the auction timer
        */

        it(`Should get the timer`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            const timer = auction.getRegressiveTimer()

            //Test
            expect(timer).toBeDefined()
            
            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`stopTimer`, () => {

        /* INTENTION
            to stop the "setInterval" function, wich represents
            the auction timer.
        */

        it(`Should stop the timer`, () => {

            /* Details
                - To really check if this test is working,
                a debugger is needed.

                - when auction is defined, go
                inside the auction object and watch for the
                "regressiveTimer" propertie.

                - after "regressiveTimer" is defined, watch for
                the propertie "_destroyed" inside the NodeJS.Timer
                object.

                - If its `False`, that means the timer still running.
                `True` otherwise.

                Because "_destroyed" is a private propertie, i didn't
                find another way to check if the `stopTimer` is really
                stoping the regressiveTimer. I wanted to find an explicity
                way.
            */

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            auction.stopTimer()

            //Test: "_destroyed" must become `True`. Read "Details" above.
            expect(auction.getRegressiveTimer()).toBeDefined()

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`deleteTimer`, () => {

        /* INTENTION
            to get rid of timer reference.
        */

        it(`Should remove the timer reference from "regressiveTimer"`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Setup
            auction.stopTimer()

            //Run
            auction.deleteTimer()

            //Test
            expect(auction.getRegressiveTimer()).toBeUndefined()

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`getParticipants`, () => {

        /* INTENTION
            to get the object containing a record of
            biders as a key, and their total bid value.
        */

        it(`Should get the record of biders`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider_1 = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }
            const bider_2 = {
                userName: 'Dummy Viewer 2',
                bidValue: 200
            }

            //Setup
            auction.bid(bider_1)
            auction.bid(bider_2)

            //Run
            const biders = auction.getBiders()

            //Test
            expect(biders[bider_1.userName]).toBe(bider_1.bidValue)
            expect(biders[bider_2.userName]).toBe(bider_2.bidValue)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`registerBider`, () => {

        /* INTENTION
            to register a new bider when someone
            do their first bid.
        */

        it(`Should register a bider`, () => {

            //Instantiation
            const bider = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run
            auction.registerBider(bider.userName, bider.bidValue)

            //Test
            expect(auction.getBiders()[bider.userName]).toBe(bider.bidValue)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`increaseBiderTotalScore`, () => {

        /* INTENTION
            to increase the total bid when someone
            is already registered as a current bider.
        */

        it(`Should increase bider total score`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }

            //Setup
            auction.bid(bider)

            //Run
            auction.increaseBiderTotalScore(bider.userName, 400)

            //Test
            expect(auction.getBiders()[bider.userName]).toBe(bider.bidValue + 400)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`isBiderRegistered`, () => {

        /* INTENTION
            to increase the total bid when someone
            is already registered as a current bider.
        */

        it(`Should return "True" if bider is registered, "False" otherwise`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }

            //Run and Test 1
            const answer_1 = auction.isBiderRegistered(bider.userName)
            expect(answer_1).toBe(false)

            //Setup
            auction.bid(bider)

            //Run and Test 2
            const answer_2 = auction.isBiderRegistered(bider.userName)
            expect(answer_2).toBe(true)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`isAuctionFinished`, () => {

        /* INTENTION
            to say if the auction is finish or not
            by just watching the seconds left.
        */

        it(`Should return "True" if its finished, "False" otherwise`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)

            //Run and Test 1
            const answer_1 = auction.isAuctionFinished()
            expect(answer_1).toBe(false)

            //Setup
            auction.setSecondsLeft(0)

            //Run and Test 2
            const answer_2 = auction.isAuctionFinished()
            expect(answer_2).toBe(true)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`bid`, () => {

        /* INTENTION
            to handle the full process from the start to end
            when someone do a bid.
        */

        it(`Should make a bid`, () => {

            /*Details

                1 - it must do a bid when:
                    A - Its a first viewer bid
                    B - Viewer is already registered,

                2 - If its about 60 seconds to finish, 
                it should add a few minutes when:
                    A - it's a draw,
                    B - there is a new winner
                    C - when auction receive it's first bid
            */

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider_1 = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }
            const bider_2 = {
                userName: 'Dummy Viewer 2',
                bidValue: 400
            }

            //Run and Test 1A
            auction.bid(bider_1)
            expect(auction.getBiders()[bider_1.userName]).toBe(200)

            //Run and Test 1B
            auction.bid(bider_1)
            expect(auction.getBiders()[bider_1.userName]).toBe(200 * 2)

            //Setup, Run and Test 2A
            auction.setSecondsLeft(30)
            auction.bid(bider_2)
            expect(auction.getSecondsLeft()).toBeGreaterThan(60)

            //Setup, Run and Test 2B
            auction.setSecondsLeft(30)
            auction.bid(bider_1)
            expect(auction.getSecondsLeft()).toBeGreaterThan(60)

            //Setup, Run and Test 2C
            const auction_2 = Auction.init(itemName, minutes)
            auction_2.setSecondsLeft(30)
            auction_2.bid(bider_1)
            expect(auction_2.getSecondsLeft()).toBeGreaterThan(60)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`getRank`, () => {

        /* INTENTION
            to get a array of biders, sorted from
            highest bid to lowest.
        */

        it(`Should get a descendent sorted array of biders`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider_1 = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }
            const bider_2 = {
                userName: 'Dummy Viewer 2',
                bidValue: 600
            }
            const bider_3 = {
                userName: 'Dummy Viewer 3',
                bidValue: 400
            }

            //Setup
            auction.bid(bider_1)
            auction.bid(bider_2)
            auction.bid(bider_3)

            //Run
            const rank = auction.getRank()

            //Tests
            expect(rank[0].name).toBe(bider_2.userName)
            expect(rank[1].name).toBe(bider_3.userName)
            expect(rank[2].name).toBe(bider_1.userName)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`addExtraTimeOnFinalMinutes`, () => {

        /* INTENTION
            to add extra minutes when people is trying
            hard to get an item, to give oportunity for
            competition.
        */

        it(`Should add extra minutes`, () => {

            /* Details:

                Should add extra minutes only when auction
                is about a minute to finish, and only on these
                situations:

                1 - When is the first bid
                2 - When there is a new winner
                3 - When It's a drow
            */

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider_1 = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }
            const bider_2 = {
                userName: 'Dummy Viewer 2',
                bidValue: 400
            }

            //Setup, Run and Test 1
            auction.setSecondsLeft(30)
            auction.bid(bider_1)
            expect(auction.getSecondsLeft()).toBeGreaterThan(60)

            //Setup, Run and Test 2
            auction.setSecondsLeft(30)
            auction.bid(bider_2)
            expect(auction.getSecondsLeft()).toBeGreaterThan(60)

            //Setup, Run and Test 3
            auction.setSecondsLeft(30)
            auction.bid(bider_1)
            expect(auction.getSecondsLeft()).toBeGreaterThan(60)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`isDraw`, () => {

        /* INTENTION
            to return "True" if the current leaderboard has 2
            people with higher score and at the first place.
            "False" otherwise
        */

        it(`Should return true when there is a draw inside biders record`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider_1 = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }
            const bider_2 = {
                userName: 'Dummy Viewer 2',
                bidValue: 200
            }

            //Setup
            auction.bid(bider_1)
            auction.bid(bider_2)

            //Run
            const result_1 = auction.isDraw(bider_1.userName)
            const result_2 = auction.isDraw(bider_2.userName)
            
            //Tests
            expect(result_1 && result_2).toBe(true)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`isNewWinner`, () => {

        /* INTENTION
            to return "True" if the last bider is on first place.
            "False otherwise"
        */

        it(`Should return true when last bider got first place`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider_1 = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }
            const bider_2 = {
                userName: 'Dummy Viewer 2',
                bidValue: 300
            }

            //Setup
            auction.bid(bider_1)
            auction.bid(bider_2)

            //Run
            const result_1 = auction.isNewWinner(bider_1.userName)
            const result_2 = auction.isNewWinner(bider_2.userName)

            //Tests
            expect(result_1).toBe(false)
            expect(result_2).toBe(true)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`isFirstBidder`, () => {

        /* INTENTION
            to return "True" if the last bider is 
            the first and only current bider.
            "False" otherwise
        */

        it(`Should return true when last bider is the only bider`, () => {

            //Instantiation
            const itemName = "Fake Item"
            const minutes = 1
            const auction = Auction.init(itemName, minutes)
            const bider_1 = {
                userName: 'Dummy Viewer 1',
                bidValue: 200
            }
            const bider_2 = {
                userName: 'Dummy Viewer 2',
                bidValue: 300
            }

            //Setup, Run, Test 1
            auction.bid(bider_1)
            const result_1 = auction.isFirstBidder(bider_1.userName)
            expect(result_1).toBe(true)

            //Setup, Run, Test 2
            auction.bid(bider_2)
            auction.bid(bider_1)
            const result_2 = auction.isFirstBidder(bider_2.userName)
            const result_3 = auction.isFirstBidder(bider_1.userName)
            expect(result_2).toBe(false)
            expect(result_3).toBe(false)

            //Sanitizer
            Auction.clearAllAuctions()
        })
    })

    describe(`announceResults`, () => {

        /* INTENTION
            to be just a handle to decide wich message
            will be sent to streaming chat when 
            auction just finished. No need to test
        */

        it(``, () => {})
    })

    describe(`ifNoBiderResult`, () => {
        
        /* INTENTION
            to just send a message to streaming chat
            when there is no bider when auction is finished.
            No need to test
        */

        it(``, () => {})
    })

    describe(`ifOneBiderResult`, () => {

        /* INTENTION
            to just send a message to streaming chat
            when there is only one bider when auction is finished.
            No need to test
        */

        it(``, () => {})
    })

    describe(`ifDrawResult`, () => {

        /* INTENTION
            to just send a message to streaming chat
            when there is a draw when auction is finished.
            No need to test
        */

        it(``, () => {})
    })

    describe(`ifNormalWinnerResult`, () => {

        /* INTENTION
            to just send a message to streaming chat
            when there is a normal winner situation 
            when auction is finished.
            No need to test
        */

        it(``, () => {})
    })
}
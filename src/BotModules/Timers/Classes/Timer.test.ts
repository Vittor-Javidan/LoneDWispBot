import { describe, expect, it } from 'vitest';
import Timer from './Timer.js';

describe(`Timer class`, () => {

    describe(`
        createTimer
        doesTimerExist
        deleteTimer
    `, () => {

        it(`Should: creates a timer and delete the timer`, () => {
    
            const timerName = "Timer 1"
            const timerMessage = "Test message"
            const interval = 1
            const timeLimit = 2
    
            //createTimer
            Timer.createTimer(timerName, timerMessage, interval, timeLimit)
            expect(Timer.timerList[0].name).toBe(timerName.toUpperCase())

            //doesTimerExist
            expect(Timer.doesTimerExist(timerName)).toBe(true)
    
            //deleteTimer
            Timer.deleteTimer(timerName)
            expect(Timer.timerList.length).toBe(0)
        })

        it(`Should:
            1 - not create duplicate timers
            2 - not deleteTimer that does not exist
        `, () => {

            const timerName = "Timer 1"
            const timerMessage = "Test message"
            const interval = 1
            const timeLimit = 2
    
            //Setup
            Timer.createTimer(timerName, timerMessage, interval, timeLimit)

            //Do not create duplicate timers
            Timer.createTimer(timerName, timerMessage, interval, timeLimit)
            expect(Timer.timerList[0].name).toBe(timerName.toUpperCase())
            expect(Timer.timerList.length).toBe(1)

            //Setup 2
            Timer.deleteTimer(timerName) 

            //Do not deleteTimer that does not exist
            expect(Timer.timerList.length).toBe(0)
            Timer.deleteTimer(timerName)
        })
    })
})
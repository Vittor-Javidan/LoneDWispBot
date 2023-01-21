import sendMessage from "../../../Twitch/sendMessageHandler.js"

export default class Timer {

    static timerList: Timer[] = []

    name: string
    counter = 0
    timer: NodeJS.Timer
    interval: number
    timeLimit: number

    /**
     * @param interval - time between message being sent
     * @param timeLimit - time where the next message sent will be the last
     */
    private constructor(timerName: string, message: string, interval: number, timeLimit: number) {

        this.name = timerName.toUpperCase()
        this.interval = interval
        this.timeLimit = timeLimit

        this.timer = setInterval(() => {

            sendMessage(message)
            this.counter++;
            this.checkTimeout()

        }, interval * 60 * 1000)
    }

    static doesTimerExist(timerName: string): boolean {

        let doesNameExist = false

        Timer.timerList.forEach(timer => {
            if(timer.name === timerName.toUpperCase()) {
                doesNameExist = true
            }
        })

        return doesNameExist
    }

    static createTimer(timerName: string, message: string, interval_Minutes: number, timeLimit_Minutes: number): void {

        if(Timer.doesTimerExist(timerName)) {
            sendMessage(`O timer "${timerName}" já existe`)
            return
        }

        Timer.timerList.push(new Timer(
            timerName, 
            message, 
            interval_Minutes, 
            timeLimit_Minutes
        ))

        sendMessage(`Timer "${timerName}" criado`)
    }

    static deleteTimer(timerName: string): void {

        if(!Timer.doesTimerExist(timerName)) {
            sendMessage(`O timer "${timerName}" não existe`)
            return
        }

        
        Timer.timerList.forEach((timer, index) => {
            if(timer.name === timerName.toUpperCase()) {
                clearInterval(timer.timer)
                Timer.timerList.splice(index)
            }
        })

        sendMessage(`Timer "${timerName}" deletado`)
    }

    static showTimers(): void {

        let message = ""
        this.timerList.forEach(timer => {
            message +=  `| ${timer.name} `
        })

        this.timerList.length === 0
            ? message += `| Sem timers ativos no momento |`
            : message += `|`

        sendMessage(message)
    }

    checkTimeout(): void {

        if (this.counter * this.interval >= this.timeLimit) {
            Timer.deleteTimer(this.name)
        }
    }
}
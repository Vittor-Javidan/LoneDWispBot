import client from "./client.js"

function sendMessage(message: string): void {

    if (process.env.NODE_ENV === 'test') {
        return
    }

    client.say('#lonedwisp', message).catch(err => {
        console.log('Could no sent message to channels chat')
        console.log(err)
    })
}

function sendDelayedMessage(message: string, delay_milisseconds: number): void {

    if (process.env.NODE_ENV === 'test') {
        return
    }

    setTimeout(()=> {
        client.say('#lonedwisp', message).catch(err => {
            console.log('Could no sent delayed message to channels chat')
            console.log(err)
        })
    }, delay_milisseconds)
}

export default sendMessage
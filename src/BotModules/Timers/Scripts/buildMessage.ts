export default function buildMessage(words: string[]): string {
    
    let message = ''
    for(let i = 4; i < words.length; i++) {
        message += words[i] + ' '
    }
    return message
}
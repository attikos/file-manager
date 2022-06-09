import setPath from "./utils/set-path.js"
import { createControllerStream } from './controllerStream.js'
import { homedir } from 'os'

const showExitMessage = (username) => {
    process.stdout.write(`Thank you for using File Manager${ username ? ', ' + username : ''}!\n`)
}

const showGreetingMessage = (username) => {
    process.stdout.write(`Welcome to the File Manager${ username ? ', ' + username : ''}!\n`)
}

export const main = () => {
    let args = process.argv.slice(2)

    const argsList = {
        USERNAME : '--username',
    }

    args = args.map(arg => {
        const [key, value] = arg.split('=')
        return [key, value]
    });

    const argsHash = Object.fromEntries(args);

    const username = argsHash[ argsList.USERNAME ];

    // createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // }).on('SIGINT', () => process.emit('SIGINT'));

    showGreetingMessage(username)
    // init path
    setPath(homedir());

    process.stdin.pipe(createControllerStream())

    process.on('SIGINT', () => {
        process.exit(1)
    })

    process.on('exit', () => {
        showExitMessage(username)
    })
}

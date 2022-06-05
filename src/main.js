import { controllerStream } from './controllerStream.js'

const showExitMessage = (username) => {
    process.stdout.write(`\nThank you for using File Manager, ${username}!\n`)
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

    // console.log('argsHash', argsHash);

    const username = argsHash[ argsList.USERNAME ];

    // createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // }).on('SIGINT', () => process.emit('SIGINT'));

    showGreetingMessage(username)

    // process.stdin.on('data', d => console.log(d.toString()))
    process.stdin.pipe(controllerStream())

    // process.openStdin()
        // .on('keypress', function(chunk, key) {
        //     console.log('chunk', chunk);
        //     console.log('key', key);


        //     if(key && key.name === "c" && key.ctrl) {
        //         console.log("bye bye");
        //         // process.stdout.write(`5Thank you for using File Manager, ${username}!\n`)
        //         process.exit();
        //     }
        // })
        // .on('data', data => console.log(data.toString()))

    // tty.setRawMode(true);

    process.on('SIGINT', () => {
        showExitMessage(username)
        process.exit(1)
    })
}

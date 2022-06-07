import up from './modules/up.js'
import cd from './modules/cd.js'
import { Writable } from 'stream'

// import path, { dirname } from 'path'
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const commandsMap = {
    up,
    cd,
    '.exit' : () => process.exit()
}


const trim = (buffer) => buffer
    .toString()
    .replace(/[ ]+/g, ' ')
    .replace(/[\r\n]*/g, '')
    .replace(/(^[ ]*)|([ ]*$)/g, '')

export const createControllerStream = () => {
    const stream = new Writable({
        defaultEncoding: 'utf8',
        decodeStrings: true,
    })

    stream.write = (chunk, _, callback, error) => {
        const [command, ...args] = trim(chunk).split(' ');

        if (args.length) {
            const lastIndex = args.length - 1;
            args[lastIndex] = args[lastIndex].replace('\n', '')
        }
        // console.log('command: ', command);
        // console.log('args: ', args);

        if (!commandsMap[command]) {
            console.log('Invalid input');
        }
        else {
            try {
                commandsMap[command](args)
            } catch (error) {
                console.log('Operation failed:', error.message)
            }
        }
    }

    stream.on('data', (data) => console.log(data.toString()))

    return stream
}

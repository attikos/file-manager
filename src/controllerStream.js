import up from './modules/up.js'
import cd from './modules/cd.js'
import ls from './modules/ls.js'
import cat from './modules/cat.js'
import add from './modules/add.js'
import rn from './modules/rn.js'
import cp from './modules/cp.js'
import mv from './modules/mv.js'
import rm from './modules/rm.js'
import pwd from './modules/pwd.js'
import os from './modules/os.js'
import hash from './modules/hash.js'
import { Writable } from 'stream'

const commandsMap = {
    up,
    cd,
    ls,
    cat,
    add,
    rn,
    cp,
    mv,
    rm,
    pwd,
    os,
    hash,
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

    stream.write = async (chunk, _, callback, error) => {
        const [command, ...args] = trim(chunk).split(' ');

        if (args.length) {
            const lastIndex = args.length - 1;
            args[lastIndex] = args[lastIndex].replace('\n', '')
        }

        if (!commandsMap[command]) {
            console.log('Invalid input');
        }
        else {
            try {
                await commandsMap[command](args)
            } catch (error) {
                console.log('Operation failed:', error.message)
            }
        }

        console.log(`You are currently in ${globalThis.currentDir}`)
    }

    stream.on('data', (data) => console.log(data.toString()))

    return stream
}

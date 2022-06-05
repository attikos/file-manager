import { Writable } from 'stream'

const trim = (buffer) => buffer
    .toString()
    .replace(/[ ]+/g, ' ')
    .replace(/[\r\n]*/g, '')
    .replace(/(^[ ]*)|([ ]*$)/g, '')

export const controllerStream = () => {
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
        console.log('command: ', command);
        console.log('args: ', args);
    }

    stream.on('data', (data) => console.log(data.toString()))

    return stream
}

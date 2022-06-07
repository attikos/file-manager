import path from 'path'

export default function(...pathList) {
    if (!pathList.length) {
        throw Error('PathName is required!');
    }

    globalThis.currentDir = path.resolve(...pathList)

    console.log(`\nYou are currently in ${globalThis.currentDir}\n`)
}

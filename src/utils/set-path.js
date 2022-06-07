import path from 'path'
import fs from 'fs'
import { homedir } from 'os'

export default function(...pathList) {
    if (!pathList.length) {
        throw Error('PathName is required!');
    }

    let newPath;
    if (pathList[0].includes('.')) {
        newPath = path.resolve(globalThis.currentDir, pathList[0])
    }
    if (/^~/.test(pathList[0])) {
        const tmpPath = pathList[0].replace(/^~/g, homedir())
        newPath = path.resolve(tmpPath)
    }
    else {
        newPath = path.resolve(...pathList)
    }

    if (!fs.existsSync(newPath)) {
        throw Error(`Incorrect path ${newPath}`)
    }

    globalThis.currentDir = newPath
    console.log(`\nYou are currently in ${globalThis.currentDir}\n`)
}

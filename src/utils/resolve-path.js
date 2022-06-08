import path from 'path'
import { promises as fsAsync } from 'fs'
import { homedir } from 'os'

export default async function(...pathList) {
    let newPath;

    if (pathList[0].indexOf('./') !== -1 || pathList[0].indexOf('..') !== -1) {
        newPath = path.resolve(globalThis.currentDir, pathList[0])
    }
    else if (/^~/.test(pathList[0])) {
        const tmpPath = pathList[0].replace(/^~/g, homedir())
        newPath = path.resolve(tmpPath)
    }
    else if (/^\//.test(pathList[0])) {
        newPath = path.resolve(...pathList)
    }
    else {
        newPath = path.resolve(globalThis.currentDir, ...pathList)
    }

    try {
        await fsAsync.access(newPath)
    }
    catch(err) {
        throw Error(`Incorrect path ${newPath}`)
    }

    return newPath;
}

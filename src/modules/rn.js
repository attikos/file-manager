import fs from 'fs'
import path from 'path'
import { promises as fsAsync } from 'fs'
import resolvePath from '../utils/resolve-path.js'

export default async function([oldFile, newFile]) {
    let oldFilePath;
    let newFilePath = path.resolve(globalThis.currentDir, newFile);

    if (fs.existsSync(newFilePath)) {
        throw Error(`File exist: ${newFilePath} \n`)
    }

    try {
        oldFilePath = await resolvePath(oldFile);
    } catch (error) {
        throw error;
    }

    await fsAsync.rename(oldFilePath, newFilePath)

    console.log('File successfully renamed\n')
}

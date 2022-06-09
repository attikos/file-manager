import path from 'path'
import resolvePath from '../utils/resolve-path.js'
import { createGunzip } from 'zlib'
import { pipeline } from 'stream/promises'
import { existsSync, createReadStream, createWriteStream } from 'fs'

export default async function([fileName, target]) {
    if (!fileName) {
        throw Error('First argument is missing')
    }

    if (!target) {
        throw Error('Second argument is missing')
    }

    let targetFile = path.resolve(globalThis.currentDir, target)
    if (existsSync(targetFile)) {
        throw Error(`File is exist: ${targetFile}`)
    }

    let sourceFile;
    try {
        sourceFile = await resolvePath(fileName);
    } catch (error) {
        throw error;
    }

    const unzipStream = createGunzip();
    const sourceStream = createReadStream(sourceFile);
    const targetStream = createWriteStream(targetFile)

    await pipeline(sourceStream, unzipStream, targetStream);

    console.log('File unzipped successfully!')
}

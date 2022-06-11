import path from 'path'
import resolvePath from '../utils/resolve-path.js'
import { createBrotliCompress } from 'zlib'
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

    let sourceFile
    try {
        sourceFile = await resolvePath(fileName)
    } catch (error) {
        throw error
    }

    const brotli = createBrotliCompress()
    const sourceStream = createReadStream(sourceFile)
    const targetStream = createWriteStream(targetFile)

    await pipeline(sourceStream, brotli, targetStream)

    console.log('File zipped successfully!')
}

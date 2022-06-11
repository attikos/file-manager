import { promises as fsAsync } from 'fs'
import resolvePath from '../utils/resolve-path.js'
import crypto from 'crypto'

export default async function([fileName]) {
    if (!fileName) {
        throw Error('File name is missing')
    }

    let sourceFile

    try {
        sourceFile = await resolvePath(fileName)
    } catch (error) {
        throw error
    }

    const file = await fsAsync.readFile(sourceFile, 'utf8')

    const res = crypto.createHash('sha256').update(file).digest('hex')

    console.log(res)
}

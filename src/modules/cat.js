import { promises as fsAsync } from 'fs'
import resolvePath from '../utils/resolve-path.js'

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

    console.log('\n', file, '\n')
}

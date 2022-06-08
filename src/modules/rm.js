import { promises as fsAsync } from 'fs'
import resolvePath from '../utils/resolve-path.js'

export default async function([filePath]) {
    let sourceFile;

    try {
        sourceFile = await resolvePath(filePath);
    } catch (error) {
        throw error;
    }

    await fsAsync.rm(sourceFile)

    console.log('File successfully removed\n')
}

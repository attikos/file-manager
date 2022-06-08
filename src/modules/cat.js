import fs, { promises as fsAsync } from 'fs'
import resolvePath from '../utils/resolve-path.js'

export default async function(pathName) {
    const path = pathName[0] || '.';
    let sourceFile;

    try {
        sourceFile = await resolvePath(path);
    } catch (error) {
        throw error;
    }

    const file = await fsAsync.readFile(sourceFile, 'utf8')

    console.log('\n', file, '\n')
}

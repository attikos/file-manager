import fs, { promises as fsAsync } from 'fs'
import resolvePath from '../utils/resolve-path.js'

export default async function(pathName) {
    const path = pathName[0] || '.';
    let resolvedPath;
    try {
        resolvedPath = await resolvePath(path);
    } catch (error) {
        throw error;
    }

    const files = await fsAsync.readdir(resolvedPath);

    console.log(files.join('\n'), '\n');
}

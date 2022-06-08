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

    let result;

    const stats = await fsAsync.stat(resolvedPath);

    if (stats.isDirectory()) {
        const files = await fsAsync.readdir(resolvedPath);
        result = files.join('\n') + '\n';
    }
    else {
        result = `
- file path: ${resolvedPath}
- size: ${stats.size}b
`
    }

    console.log(result);
}

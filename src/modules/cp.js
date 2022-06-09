import fs from 'fs'
import path from 'path'
import { promises as fsAsync } from 'fs'
import resolvePath from '../utils/resolve-path.js'

const copyDir = async (sourcePath, targetPath) => {
    await fsAsync.mkdir(targetPath, { recursive: true })

    const sourceFileList = await fsAsync.readdir(sourcePath, { withFileTypes: true });

    for await (let file of sourceFileList) {
        let srcPath    = path.join(sourcePath, file.name);
        let trgtPath = path.join(targetPath, file.name);

        if (file.isDirectory()) {
            await copyDir(srcPath, trgtPath)
        }
        else {
            await fsAsync.copyFile(srcPath, trgtPath);
        }
    }
}

export default async function([source, target]) {
    let sourcePath;
    let targetPath = path.resolve(globalThis.currentDir, target);

    if (fs.existsSync(targetPath)) {
        throw Error(`File exist: ${targetPath}`)
    }

    try {
        sourcePath = await resolvePath(source);
    } catch (error) {
        throw error;
    }

    copyDir(sourcePath, targetPath)

    console.log('File successfully copied')
}

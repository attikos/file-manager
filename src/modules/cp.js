import fs from 'fs'
import path from 'path'
import { promises as fsAsync } from 'fs'
import resolvePath from '../utils/resolve-path.js'

const copy = async (sourcePath, targetPath) => {
    let sourceFileList;
    const stats = await fsAsync.stat(sourcePath)

    if (stats.isDirectory()) {
        await fsAsync.mkdir(targetPath, { recursive: true })
        sourceFileList = await fsAsync.readdir(sourcePath, { withFileTypes: true })
    }
    else {
        return await fsAsync.copyFile(sourcePath, targetPath)
    }

    for await (let file of sourceFileList) {
        let srcPath    = path.join(sourcePath, file.name)
        let trgtPath = path.join(targetPath, file.name)

        if (file.isDirectory()) {
            await copy(srcPath, trgtPath)
        }
        else {
            await fsAsync.copyFile(srcPath, trgtPath)
        }
    }
}

export default async function([source, target]) {
    if (!source) {
        throw Error('First argument is missing')
    }

    if (!target) {
        throw Error('Second argument is missing')
    }

    let sourcePath
    let targetPath = path.resolve(globalThis.currentDir, target)

    if (fs.existsSync(targetPath)) {
        throw Error(`File or dir is exist: ${targetPath}`)
    }

    try {
        sourcePath = await resolvePath(source)
    } catch (error) {
        throw error
    }

    await copy(sourcePath, targetPath)

    const stats = await fsAsync.stat(sourcePath)

    if (stats.isDirectory()) {
        console.log('Directory successfully copied')
    }
    else {
        console.log('File successfully copied')
    }
}

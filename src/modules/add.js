import path from 'path'
import fs from 'fs'

export default async function([fileName]) {
    if (!fileName) {
        throw Error('File name is missing')
    }

    const sourceFile = path.resolve(globalThis.currentDir, fileName);

    if (fs.existsSync(sourceFile)) {
        throw Error(`File exist: ${sourceFile}`)
    }

    await fs.writeFile(sourceFile, '', (err) => {
        if (err) {
            throw Error(err)
        }
    })

    console.log('File successfully added')
}

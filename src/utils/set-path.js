import resolvePath from './resolve-path.js'

export default async function(...pathList) {
    if (!pathList.length) {
        throw Error('PathName is required!');
    }

    try {
        globalThis.currentDir = await resolvePath(...pathList)
        console.log(`\nYou are currently in ${globalThis.currentDir}\n`)
    } catch (error) {
        return false;
    }
}

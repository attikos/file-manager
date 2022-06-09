import resolvePath from './resolve-path.js'

export default async function(...pathList) {
    if (!pathList.length) {
        throw Error('PathName is required!');
    }

    try {
        globalThis.currentDir = await resolvePath(...pathList)
    } catch (error) {
        return false;
    }
}

import setPath from "../utils/set-path.js"

export default async function([pathName]) {
    if (!pathName) {
        throw Error('Path name is missing')
    }

    return await setPath(pathName)
}

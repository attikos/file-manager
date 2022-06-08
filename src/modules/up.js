import setPath from "../utils/set-path.js"

export default async function() {
    return await setPath(currentDir, '..')
}

import setPath from "../utils/set-path.js"

export default async function(pathName) {
    return await setPath(...pathName)
}

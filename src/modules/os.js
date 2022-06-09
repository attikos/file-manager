import os from 'os'

const getCpusInfo = () => {
    const cpus = os.cpus()

    return cpus.map(x => {
        const {model, speed} = x

        return {model, speed}
    })
}
export default async function([arg]) {
    const argsMap = {
        '--EOL': () => JSON.stringify(os.EOL),
        '--cpus': () => getCpusInfo(),
        '--homedir': () => os.homedir(),
        '--username': () => os.userInfo().username,
        '--architecture': () => os.arch(),
    }

    if (!argsMap[arg]) {
        throw Error(`Bad argument: ${arg}`)
    }

    const res = argsMap[arg]()

    console.log(res)
}

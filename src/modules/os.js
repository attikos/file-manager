import os from 'os'

export default async function([arg]) {
    const argsMap = {
        '--EOL': () => JSON.stringify(os.EOL),
        '--cpus': () => os.cpus(),
        '--homedir': () => os.homedir(),
        '--username': () => os.userInfo().username,
        '--architecture': () => os.arch(),
    }

    if (!argsMap[arg]) {
        throw Error(`Bad argument: ${arg}`)
    }

    const res = argsMap[arg]();

    console.log(res);
}

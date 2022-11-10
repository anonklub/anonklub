import { spawn } from 'child_process'

export const python = async (scriptPath: string, ...rest: string[]) => {
  return new Promise<string[]>((resolve, reject) => {
    const python = spawn(process.env.PYTHON ?? 'python3', [scriptPath, ...rest])

    let result = ''

    python.stdout.on('data', (data) => {
      result += data.toString() as string
    })

    python.stdout.on('end', () => {
      resolve(JSON.parse(result))
    })

    python.stderr.on('data', (err) => {
      reject(err.toString())
    })
  })
}

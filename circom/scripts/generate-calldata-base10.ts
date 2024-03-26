import { execSync } from 'node:child_process'
import { groth16 } from 'snarkjs'
import { askProofFile, askPublicSignalsFile } from './_prompt'
import { wrapExec } from './_wrap'

const toUint = (hexString: string) =>
	execSync(`cast --to-base ${hexString} 10 | tr -d "\n"`, {
		stdio: 'pipe',
	}).toString()

const toUintArray = (
	el:
		| string
		| string[]
		| string[][]
		| [string[], string[][], string[], string[]],
) =>
	Array.isArray(el) ? el.map((hexString) => toUintArray(hexString)) : toUint(el)

const stringify = (input: string[] | string[][]) => {
	if (Array.isArray(input[0])) {
		return `"[${input
			.map((el) => `[${(el as string[]).join(',')}]`)
			.join(',')}]"`
	}
	return `"[${input.join(',')}]"`
}
const main = async () => {
	const proof = await askProofFile()
	const publicSignals = await askPublicSignalsFile()

	const callDataHexStr: string = await groth16.exportSolidityCallData(
		proof,
		publicSignals,
	)

	const callDataBase10Str: [string[], string[][], string[], string[]] =
		toUintArray(JSON.parse(`[${callDataHexStr}]`))
			.map(stringify)
			.join(' ')

	console.log(callDataBase10Str)
}

wrapExec(main)

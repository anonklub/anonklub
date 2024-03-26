import { groth16 } from 'snarkjs'
import terminalLink from 'terminal-link'
import { askProofFile, askPublicSignalsFile } from './_prompt'
import { wrapExec } from './_wrap'

const stringify = (input: string[]) =>
	`${JSON.stringify(input).replace(/"/g, '')}`

const main = async () => {
	const proof = await askProofFile()
	const publicSignals = await askPublicSignalsFile()

	const callDataStr: string = await groth16.exportSolidityCallData(
		proof,
		publicSignals,
	)

	const callData: [string[], string[], string[], string[]] = JSON.parse(
		`[${callDataStr}]`,
	)
	console.log(
		`Use the following inputs to perform a 'verifyProof' read call to the ${terminalLink(
			'Groth16Verifier contract',
			'https://sepolia.etherscan.io/address/0x893f293e3918a179bf87fb772206e9927db61b0c#readContract',
		)}`,
	)
	console.log()
	console.log(`_pA: ${stringify(callData[0])}`)
	console.log(`_pB: ${stringify(callData[1])}`)
	console.log(`_pC: ${stringify(callData[2])}`)
	console.log(`publicSignals: ${stringify(callData[3])}`)
}

wrapExec(main)

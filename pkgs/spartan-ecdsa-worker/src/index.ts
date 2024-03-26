import { type Remote, wrap } from 'comlink'
import type { ISpartanEcdsaWorker } from './interface'

let SpartanEcdsaWorker: Remote<ISpartanEcdsaWorker>

if (typeof window !== 'undefined') {
	SpartanEcdsaWorker = wrap<ISpartanEcdsaWorker>(
		new Worker(new URL('./worker.js', import.meta.url)),
	)
}

export { type ProveMembershipFn, type VerifyMembershipFn } from './interface'
export { SpartanEcdsaWorker }

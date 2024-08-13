import { type Remote, wrap } from 'comlink'
import type { IHalo2EthMembershipWorker } from './interface'

let Halo2EthMembershipWorker: Remote<IHalo2EthMembershipWorker>

if (typeof window !== 'undefined') {
  Halo2EthMembershipWorker = wrap<IHalo2EthMembershipWorker>(
    new Worker(new URL('./worker.js', import.meta.url)),
  )
}

export { type ProveMembershipFn, type VerifyMembershipFn } from './interface'
export { Halo2EthMembershipWorker }

export interface ProofData {
  pi_a: [string, string, string]
  pi_b: [[string, string], [string, string], [string, string]]
  pi_c: [string, string, string]
  protocol: string
  curve: string
}

export type PublicSignalsData = [string, string, string, string, string]

export interface ProofI {
  publicSignals: PublicSignalsData
  verify: (on: 'onchain' | 'offchain') => Promise<boolean>
}

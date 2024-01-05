enum Curve {
  BN128 = 'bn128',
}

export interface Proof {
  pi_a: [string, string, string]
  pi_b: [[string, string], [string, string], [string, string]]
  pi_c: [string, string, string]
  protocol: string
  curve: Curve
}

export type PublicSignals = [string, string, string, string, string]

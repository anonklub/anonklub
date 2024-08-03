interface ISpartanEcdsaWasm {
  init_panic_hook: () => void
  prepare: () => void
  verify_membership: (proof: Uint8Array) => boolean
}

let spartanEcdsaWasm: ISpartanEcdsaWasm
let initialized = false

export const verifier = {
  async maybePrepare(): Promise<void> {
    spartanEcdsaWasm = await import('@anonklub/spartan-ecdsa-wasm')
    spartanEcdsaWasm.init_panic_hook()
    if (initialized) return
    spartanEcdsaWasm.prepare()
    initialized = true
  },
  async verifyMembership(proof: Uint8Array): Promise<boolean> {
    await verifier.maybePrepare()
    return spartanEcdsaWasm.verify_membership(proof)
  },
}

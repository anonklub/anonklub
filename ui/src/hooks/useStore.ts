import { createTypedHooks } from 'easy-peasy'
import { StoreModel } from '@/store'

const typedHooks = createTypedHooks<StoreModel>()

const useStoreState = typedHooks.useStoreState
export const useStoreActions = typedHooks.useStoreActions

/**
 * Typed hooks for the global store.
 */
export const useStore = () => ({
  anonSet: useStoreState((state) => state.anonSet.data),
  proof: useStoreState((state) => state.proof.data),
  proofRequest: useStoreState((state) => state.proofRequest.data),
  publicSignals: useStoreState((state) => state.publicSignals.data),
  resetAnonSet: useStoreActions((actions) => actions.anonSet.reset),
  setAnonSet: useStoreActions((actions) => actions.anonSet.set),
  setProof: useStoreActions((actions) => actions.proof.set),
  setProofRequest: useStoreActions((actions) => actions.proofRequest.set),
  setPublicSignals: useStoreActions((actions) => actions.publicSignals.set),
})

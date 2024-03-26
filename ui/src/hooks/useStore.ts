import { createTypedHooks } from 'easy-peasy'
import type { StoreModel } from '@/store'

const typedHooks = createTypedHooks<StoreModel>()

const useStoreState = typedHooks.useStoreState
export const useStoreActions = typedHooks.useStoreActions

/**
 * Typed hooks for the global store.
 */
export const useStore = () => ({
	anonSet: useStoreState((state) => state.anonSet.data),
	helpText: useStoreState((state) => state.help.text),
	proof: useStoreState((state) => state.proof.data),
	proofRequest: useStoreState((state) => state.proofRequest.data),
	resetAnonSet: useStoreActions((actions) => actions.anonSet.reset),
	resetProofRequest: useStoreActions((actions) => actions.proofRequest.reset),
	setAnonSet: useStoreActions((actions) => actions.anonSet.set),
	setHelpText: useStoreActions((actions) => actions.help.setText),
	setProof: useStoreActions((actions) => actions.proof.set),
	setProofRequest: useStoreActions((actions) => actions.proofRequest.set),
	setWarningWasRead: useStoreActions((actions) => actions.warning.setWasRead),
	warningWasRead: useStoreState((state) => state.warning.wasRead),
})

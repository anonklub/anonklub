import { ProofRequest } from '@anonklub/proof'
import { action, Action, createStore } from 'easy-peasy'

export interface StoreModel {
  anonSet: {
    data: string[] | null
    set: Action<{ data: string[] | null }, string[]>
    reset: Action<{ data: string[] | null }>
  }
  help: {
    text: string[] | null
    setText: Action<{ text: string[] }, string[]>
  }
  proof: {
    data: Uint8Array | null
    set: Action<{ data: Uint8Array | null }, Uint8Array | null>
  }
  proofRequest: {
    data: ProofRequest | null
    set: Action<{ data: ProofRequest | null }, ProofRequest>
    reset: Action<{ data: ProofRequest | null }>
  }
  warning: {
    wasRead: boolean
    setWasRead: Action<{ wasRead: boolean }, boolean>
  }
  error: {
    wasError: boolean
    setWasError: Action<{ wasError: boolean }, boolean>
  }
}

export const store = createStore<StoreModel>({
  anonSet: {
    data: [],
    reset: action((state) => {
      state.data = null
    }),
    set: action((state, payload) => {
      state.data = payload
    }),
  },
  help: {
    setText: action((state, payload) => {
      state.text = payload
    }),
    text: null,
  },
  proof: {
    data: null,
    set: action((state, payload) => {
      state.data = payload
    }),
  },
  proofRequest: {
    data: null,
    reset: action((state) => {
      state.data = null
    }),
    set: action((state, payload) => {
      state.data = payload
    }),
  },
  warning: {
    setWasRead: action((state, payload) => {
      state.wasRead = payload
    }),
    wasRead: false,
  },
  error: {
    setWasError: action((state, payload) => {
      state.wasError = payload
    }),
    wasError: false,
  },
})

import { ProofRequest } from '@anonklub/proof'
import { action, Action, createStore } from 'easy-peasy'
import { JSONValue } from '@components'

export interface StoreModel {
  anonSet: {
    data: string[] | null
    set: Action<{ data: string[] | null }, string[]>
    reset: Action<{ data: string[] | null }>
  }
  proof: {
    data: JSONValue | null
    set: Action<{ data: JSONValue | null }, JSONValue | null>
  }
  proofRequest: {
    data: ProofRequest | null
    set: Action<{ data: ProofRequest | null }, ProofRequest>
  }
  publicSignals: {
    data: JSONValue | null
    set: Action<{ data: JSONValue | null }, JSONValue | null>
  }
  warning: {
    wasRead: boolean
    setWasRead: Action<{ wasRead: boolean }, boolean>
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

  proof: {
    data: null,
    set: action((state, payload) => {
      state.data = payload
    }),
  },
  proofRequest: {
    data: null,
    set: action((state, payload) => {
      state.data = payload
    }),
  },
  publicSignals: {
    data: null,
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
})

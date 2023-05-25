import { action, Action, createStore } from 'easy-peasy'
import { JSONValue } from '@components'

export interface StoreModel {
  anonSet: {
    data: string[] | null
    set: Action<StoreModel, string[]>
    reset: Action<StoreModel, string[]>
  }
  proof: {
    data: JSONValue | null
    set: Action<StoreModel, JSONValue>
  }
  publicSignals: {
    data: JSONValue | null
    set: Action<StoreModel, JSONValue>
  }
}

export const store = createStore<StoreModel>({
  anonSet: {
    data: null,
    reset: action((state) => {
      state.anonSet.data = []
    }),
    set: action((state, payload) => {
      state.anonSet.data = payload
    }),
  },
  proof: {
    data: null,
    set: action((state, payload) => {
      state.proof.data = payload
    }),
  },
  publicSignals: {
    data: null,
    set: action((state, payload) => {
      state.publicSignals.data = payload
    }),
  },
})

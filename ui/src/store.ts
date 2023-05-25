import { action, Action, createStore, StoreProvider } from 'easy-peasy'
import { FC, ReactNode } from 'react'
import { JSONValue } from '@components'

interface DataModel {
  anonSet: {
    data: string[]
    set: Action<DataModel, string[]>
    reset: Action<DataModel, string[]>
  }
  proof: {
    data: JSONValue | null
    set: Action<DataModel, JSONValue>
  }
  publicSignals: {
    data: JSONValue | null
    set: Action<DataModel, JSONValue>
  }
}

export const store = createStore<DataModel>({
  anonSet: {
    data: [],
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

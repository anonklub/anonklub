import { ActionCreator, createTypedHooks } from 'easy-peasy'
import { StoreModel } from '@/store'
import { JSONValue } from '@components'

const typedHooks = createTypedHooks<StoreModel>()

export const useStoreState = typedHooks.useStoreState
const useStoreActions = typedHooks.useStoreActions

export const useStore = (
  key: keyof StoreModel,
): [JSONValue | string[] | null, ActionCreator<string[] | JSONValue>] => [
  useStoreState((state) => state[key].data),
  useStoreActions((actions) => actions[key].set),
]

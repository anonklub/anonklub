import { core } from '@pulumi/kubernetes'
import { provider } from './provider'

const ns = new core.v1.Namespace(
  'anonklub',
  {},
  {
    provider,
  },
)

export const namespace = ns.metadata.name

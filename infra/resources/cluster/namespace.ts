import { core } from '@pulumi/kubernetes'
import { config } from '../config'
import { provider } from './provider'

// FIXME
// necessary?, using a namespace causes issues when trying to delete it
// Timeout occurred polling
// https://github.com/kubernetes/kubernetes/issues/60807

const ns = new core.v1.Namespace(
  config.k8s.namespace,
  {
    metadata: {
      name: config.k8s.namespace,
    },
  },
  {
    provider,
  },
)

export const namespace = ns.metadata.name

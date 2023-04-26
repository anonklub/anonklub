import * as k8s from '@pulumi/kubernetes'
import { namespace, provider } from './cluster'
import { isMinikube } from './config'
import { appName, deployment, labels } from './deployment'

// Allocate an IP to the Deployment.
export const frontend = new k8s.core.v1.Service(
  appName,
  {
    metadata: {
      labels: deployment.spec.template.metadata.labels,
      namespace,
    },
    spec: {
      ports: [{ port: 80, protocol: 'TCP', targetPort: 80 }],
      selector: labels,
      type: isMinikube ? 'ClusterIP' : 'LoadBalancer',
    },
  },
  { provider },
)

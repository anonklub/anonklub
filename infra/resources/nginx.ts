import { apps, core } from '@pulumi/kubernetes'
import { namespace, provider } from './cluster'
import { isMinikube } from './config'

const APP_NAME = 'nginx'
const labels = { app: APP_NAME }

const deployment = new apps.v1.Deployment(
  APP_NAME,
  {
    metadata: { labels, namespace },
    spec: {
      replicas: 1,
      selector: { matchLabels: labels },
      template: {
        metadata: { labels },
        spec: { containers: [{ image: 'nginx', name: APP_NAME }] },
      },
    },
  },
  { provider },
)

export const nginx = new core.v1.Service(
  APP_NAME,
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

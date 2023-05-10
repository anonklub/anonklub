import { apps, core } from '@pulumi/kubernetes'
import { namespace, provider } from './cluster'
import { config } from './config'

const APP_NAME = 'redis'
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
        spec: {
          containers: [
            { image: 'redis', name: 'redis', ports: [{ containerPort: 6379 }] },
          ],
        },
      },
    },
  },
  { provider },
)

export const redis = new core.v1.Service(
  APP_NAME,
  {
    metadata: {
      labels: deployment.spec.template.metadata.labels,
      namespace,
    },
    spec: {
      ports: [
        {
          port: deployment.spec.template.spec.containers[0].ports[0]
            .containerPort,
        },
      ],
      selector: labels,
      type: config.k8s.isMinikube ? 'ClusterIP' : 'LoadBalancer',
    },
  },
  { provider },
)

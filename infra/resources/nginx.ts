import { apps, core } from '@pulumi/kubernetes'
import { provider } from './cluster'
import { config } from './config'

const APP_NAME = 'nginx'
const labels = { app: APP_NAME }

const deployment = new apps.v1.Deployment(
  APP_NAME,
  {
    metadata: { labels },
    spec: {
      replicas: 1,
      selector: { matchLabels: labels },
      template: {
        metadata: { labels },
        spec: {
          containers: [
            { image: 'nginx', name: APP_NAME, ports: [{ containerPort: 80 }] },
          ],
        },
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

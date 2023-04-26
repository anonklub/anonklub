import * as docker from '@pulumi/docker'
import { apps, core } from '@pulumi/kubernetes'
import { namespace, provider } from './cluster'
import { isMinikube } from './config'

const APP_NAME = 'ui'
const labels = { app: APP_NAME }

const image = new docker.Image(APP_NAME, {
  build: {
    context: '../',
    dockerfile: '../ui/Dockerfile',
  },
  imageName: APP_NAME,
  skipPush: true,
})

const deployment = new apps.v1.Deployment(
  APP_NAME,
  {
    metadata: { labels, namespace },
    spec: {
      replicas: 1,
      selector: { matchLabels: labels },
      template: {
        metadata: { labels },
        spec: { containers: [{ image: image.imageName, name: APP_NAME }] },
      },
    },
  },
  { provider },
)

export const ui = new core.v1.Service(
  APP_NAME,
  {
    metadata: {
      labels: deployment.spec.template.metadata.labels,
      namespace,
    },
    spec: {
      ports: [{ port: 3000, protocol: 'TCP', targetPort: 3000 }],
      selector: labels,
      type: isMinikube ? 'ClusterIP' : 'LoadBalancer',
    },
  },
  { provider },
)

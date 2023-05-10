import { apps, core } from '@pulumi/kubernetes'
import { namespace, provider } from './cluster'
import { config } from './config'

const APP_NAME = 'query-api'
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
            {
              env: [
                {
                  name: 'DUNE_API_KEY',
                  value: config.queryApi.DUNE_API_KEY,
                },
                {
                  name: 'GOOGLE_APPLICATION_CREDENTIALS',
                  value: config.queryApi.GOOGLE_APPLICATION_CREDENTIALS,
                },
                {
                  name: 'GRAPH_API_KEY',
                  value: config.queryApi.GRAPH_API_KEY,
                },
              ],
              image: '3pwd/anonset-query-api',
              name: APP_NAME,
              ports: [{ containerPort: 3000 }],
            },
          ],
        },
      },
    },
  },
  { provider },
)

export const queryApi = new core.v1.Service(
  APP_NAME,
  {
    metadata: {
      labels: deployment.spec.template.metadata.labels,
      namespace,
    },
    spec: {
      ports: [{ port: 3000 }],
      selector: labels,
      type: config.k8s.isMinikube ? 'ClusterIP' : 'LoadBalancer',
    },
  },
  { provider },
)

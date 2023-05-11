import { Image, RemoteImage } from '@pulumi/docker'
import { apps, core } from '@pulumi/kubernetes'
import { interpolate } from '@pulumi/pulumi'
import { join } from 'path'
import { provider } from './cluster'
import { config } from './config'
import { registryUrl } from './registry'

const ROOT_DIR = join(__dirname, '..', '..')
const APP_NAME = 'query-api'
const labels = { app: APP_NAME }

const imageName = interpolate`${registryUrl}/${APP_NAME}`

// FIXME: use remoteImage and don't push new Image if no changes compared to remote
// https://www.pulumi.com/blog/build-images-50x-faster-docker-v4/
const image = config.queryApi.SKIP_PUSH
  ? new RemoteImage(APP_NAME, {
      name: imageName,
    })
  : new Image(APP_NAME, {
      build: {
        args: {
          BUILDKIT_INLINE_CACHE: '1',
        },
        builderVersion: 'BuilderBuildKit',
        cacheFrom: {
          images: [imageName],
        },
        context: ROOT_DIR,
        dockerfile: join(ROOT_DIR, 'apis', 'query', 'Dockerfile'),
        platform: 'linux/amd64',
      },
      imageName,
      skipPush: config.queryApi.SKIP_PUSH,
    })

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
                { name: 'GOOGLE_CLOUD_PROJECT', value: config.gcp.project },
                {
                  name: 'GRAPH_API_KEY',
                  value: config.queryApi.GRAPH_API_KEY,
                },
              ],
              image: config.queryApi.SKIP_PUSH
                ? (image as RemoteImage).repoDigest
                : (image as Image).imageName,
              name: APP_NAME,
              ports: [{ containerPort: config.queryApi.PORT }],
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
    },
    spec: {
      ports: [
        {
          name: 'http',
          port: 80,
          targetPort:
            deployment.spec.template.spec.containers[0].ports[0].containerPort,
        },
        {
          name: 'https',
          port: 443,
          targetPort: 443,
        },
      ],
      selector: labels,
      type: config.k8s.isMinikube ? 'ClusterIP' : 'LoadBalancer',
    },
  },
  { provider },
)

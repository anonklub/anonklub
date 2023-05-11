import { helm, networking } from '@pulumi/kubernetes'
import { provider } from './cluster'
import { nginx } from './nginx'
import { queryApi } from './query-api'

// https://github.com/pulumi/templates/blob/master/helm-kubernetes-typescript/index.ts
// FIXME: this does create an error but with following error
// error: 1 error occurred:
//         * Helm release "anonklub/ingress-controller-175505c5" was created, but failed to initialize completely. Use Helm CLI to investigate.: failed to become available within allocated timeout. Error: Helm Release anonklub/ingress-controller-175505c5: timed out waiting for the condition
const ingressController = new helm.v3.Release('ingress-controller', {
  chart: 'nginx-ingress',
  repositoryOpts: { repo: 'https://helm.nginx.com/stable' },
  skipCrds: true,
  values: {
    controller: {
      appprotect: { enable: false },
      appprotectdos: { enable: false },
      enableCustomResources: false,
      service: { extraLabels: { app: 'nginx-ingress' } },
    },
  },
  version: '0.14.1',
})

export const ingress = new networking.v1.Ingress(
  'ingress',
  {
    metadata: {
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'nginx.ingress.kubernetes.io/use-regex': 'true',
        // https://github.com/pulumi/pulumi-kubernetes/issues/1810#issuecomment-978387032
        'pulumi.com/skipAwait': 'true',
      },
      name: 'ingress',
    },
    spec: {
      rules: [
        {
          // host: 'anonklub.xyz',
          http: {
            paths: [
              {
                backend: {
                  service: {
                    name: queryApi.metadata.name,
                    port: {
                      number: 80,
                    },
                  },
                },
                path: '/api/query/?(.*)',
                pathType: 'Prefix',
              },
              {
                backend: {
                  service: {
                    name: nginx.metadata.name,
                    port: {
                      number: 80,
                    },
                  },
                },
                path: '/?(.*)',
                pathType: 'Prefix',
              },
            ],
          },
        },
      ],
    },
  },
  { provider },
)

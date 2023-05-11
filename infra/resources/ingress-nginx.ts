import { networking } from '@pulumi/kubernetes'
import { IngressController } from '@pulumi/kubernetes-ingress-nginx'
import { namespace, provider } from './cluster'
import { nginx } from './nginx'
import { queryApi } from './query-api'

// export const controller = new IngressController(
//   'ingress-nginx-controller',
//   {
//     controller: {
//       publishService: {
//         enabled: true,
//       },
//     },
//   },
//   { provider },
// )

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
      namespace,
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
                    name: nginx.metadata.name,
                    port: {
                      number: 80,
                    },
                  },
                },
                path: '/?(.*)',
                pathType: 'Prefix',
              },
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
            ],
          },
        },
      ],
    },
  },
  { provider },
)

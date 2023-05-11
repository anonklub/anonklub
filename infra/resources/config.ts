import * as pulumi from '@pulumi/pulumi'

// Get some provider-namespaced configuration values
const gcpCfg = new pulumi.Config('gcp')
const cfg = new pulumi.Config()
const queryApiCfg = new pulumi.Config('query-api')

export const config = {
  gcp: {
    project: gcpCfg.require('project'),
    region: gcpCfg.get('region') ?? 'europe-west3',
  },
  k8s: {
    isMinikube: cfg.getBoolean('isMinikube') ?? false,
    nodesPerZone: cfg.getNumber('nodesPerZone') ?? 1,
  },
  queryApi: {
    DUNE_API_KEY: queryApiCfg.requireSecret('DUNE_API_KEY'),
    GOOGLE_APPLICATION_CREDENTIALS: queryApiCfg.requireSecret(
      'GOOGLE_APPLICATION_CREDENTIALS',
    ),
    GOOGLE_CLOUD_PROJECT: gcpCfg.require('project'),
    GRAPH_API_KEY: queryApiCfg.requireSecret('GRAPH_API_KEY'),
    NODE_ENV: queryApiCfg.get('NODE_ENV') ?? 'development',
    PORT: queryApiCfg.getNumber('PORT') ?? 3000,
    SKIP_PUSH: queryApiCfg.getBoolean('SKIP_PUSH') ?? true,
  },
}

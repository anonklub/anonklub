// Create a nodepool for the GKE cluster
import * as gcp from '@pulumi/gcp'
import { config } from '../config'
import { gkeCluster } from './cluster'
import { gkeNodepoolSa } from './service-account'

const gkeNodepool = new gcp.container.NodePool('gke-nodepool', {
  cluster: gkeCluster.id,
  nodeConfig: {
    oauthScopes: ['https://www.googleapis.com/auth/cloud-platform'],
    serviceAccount: gkeNodepoolSa.email,
  },
  nodeCount: config.k8s.nodesPerZone,
})

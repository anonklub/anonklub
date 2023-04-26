// Create a service account for the node pool
import * as gcp from '@pulumi/gcp'
import * as pulumi from '@pulumi/pulumi'
import { gkeCluster } from './cluster'

export const gkeNodepoolSa = new gcp.serviceaccount.Account('gke-nodepool-sa', {
  accountId: pulumi.interpolate`${gkeCluster.name}-np-1-sa`,
  displayName: 'Nodepool 1 Service Account',
})

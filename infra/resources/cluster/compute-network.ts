import * as gcp from '@pulumi/gcp'

export const gkeNetwork = new gcp.compute.Network('gke-network', {
  autoCreateSubnetworks: false,
  description: 'A virtual network for your GKE cluster(s)',
})

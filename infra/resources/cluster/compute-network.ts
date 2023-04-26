import { compute } from '@pulumi/gcp'

export const gkeNetwork = new compute.Network('gke-network', {
  autoCreateSubnetworks: false,
  description: 'A virtual network for your GKE cluster(s)',
})

import * as gcp from '@pulumi/gcp'
import { gcpRegion } from '../config'
import { gkeNetwork } from './compute-network'

export const gkeSubnet = new gcp.compute.Subnetwork('gke-subnet', {
  ipCidrRange: '10.128.0.0/12',
  network: gkeNetwork.id,
  privateIpGoogleAccess: true,
  region: gcpRegion,
})

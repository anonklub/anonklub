// FIXME: is there another way than exporting all resources to make sure they are created when they are defined in separated files?
import './resources'
import {
  deployment,
  frontend,
  gkeCluster,
  gkeNetwork,
  isMinikube,
} from './resources'

export { kubeconfig } from './resources'
export const networkName = gkeNetwork.name
export const networkId = gkeNetwork.id
export const clusterName = gkeCluster.name
export const clusterId = gkeCluster.id
export const deploymentName = deployment.metadata.name
// When "done", this will print the public IP.
export const ip = isMinikube
  ? frontend.spec.clusterIP
  : frontend.status.loadBalancer.apply(
      (lb) => lb.ingress[0].ip ?? lb.ingress[0].hostname,
    )

// FIXME: is there another way than exporting all resources to make sure they are created when they are defined in separated files?
import './resources'
import {
  config,
  gkeCluster,
  gkeNetwork,
  nginx,
  // ui,
  queryApi,
  redis,
} from './resources'

export { kubeconfig } from './resources'
export const networkName = gkeNetwork.name
export const networkId = gkeNetwork.id
export const clusterName = gkeCluster.name
export const clusterId = gkeCluster.id

// When "done", this will print the public IP.
export const nginxIp = config.k8s.isMinikube
  ? nginx.spec.clusterIP
  : nginx.status.loadBalancer.apply(
      (lb) => lb.ingress[0].ip ?? lb.ingress[0].hostname,
    )

// export const uiIp = config.k8s.isMinikube
//   ? ui.spec.clusterIP
//   : ui.status.loadBalancer.apply(
//       (lb) => lb.ingress[0].ip ?? lb.ingress[0].hostname,
//     )

export const queryApiIp = config.k8s.isMinikube
  ? queryApi.spec.clusterIP
  : queryApi.status.loadBalancer.apply(
      (lb) => lb.ingress[0].ip ?? lb.ingress[0].hostname,
    )

export const redisIp = config.k8s.isMinikube
  ? redis.spec.clusterIP
  : redis.status.loadBalancer.apply(
      (lb) => lb.ingress[0].ip ?? lb.ingress[0].hostname,
    )

// export const ingressControllerStatus = controller.status
// export const ingressId = ingress.me

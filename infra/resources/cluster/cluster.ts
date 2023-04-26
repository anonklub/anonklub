import * as gcp from '@pulumi/gcp'
import * as pulumi from '@pulumi/pulumi'
import { gcpProject, gcpRegion } from '../config'
import { gkeNetwork } from './compute-network'
import { gkeSubnet } from './subnet'

export const gkeCluster = new gcp.container.Cluster('gke-cluster', {
  addonsConfig: {
    dnsCacheConfig: {
      enabled: true,
    },
  },
  binaryAuthorization: {
    evaluationMode: 'PROJECT_SINGLETON_POLICY_ENFORCE',
  },
  datapathProvider: 'ADVANCED_DATAPATH',
  description: 'A GKE cluster',
  initialNodeCount: 1,
  ipAllocationPolicy: {
    clusterIpv4CidrBlock: '/14',
    servicesIpv4CidrBlock: '/20',
  },
  location: gcpRegion,
  masterAuthorizedNetworksConfig: {
    cidrBlocks: [
      {
        cidrBlock: '0.0.0.0/0',
        displayName: 'All networks',
      },
    ],
  },
  network: gkeNetwork.name,
  networkingMode: 'VPC_NATIVE',
  privateClusterConfig: {
    enablePrivateEndpoint: false,
    enablePrivateNodes: true,
    masterIpv4CidrBlock: '10.100.0.0/28',
  },
  releaseChannel: {
    channel: 'STABLE',
  },
  removeDefaultNodePool: true,
  subnetwork: gkeSubnet.name,
  workloadIdentityConfig: {
    workloadPool: `${gcpProject}.svc.id.goog`,
  },
})

export const kubeconfig = pulumi.interpolate`apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${gkeCluster.masterAuth.clusterCaCertificate}
    server: https://${gkeCluster.endpoint}
  name: ${gkeCluster.name}
contexts:
- context:
    cluster: ${gkeCluster.name}
    user: ${gkeCluster.name}
  name: ${gkeCluster.name}
current-context: ${gkeCluster.name}
kind: Config
preferences: {}
users:
- name: ${gkeCluster.name}
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      command: gke-gcloud-auth-plugin
      installHint: Install gke-gcloud-auth-plugin for use with kubectl by following
        https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
      provideClusterInfo: true
`

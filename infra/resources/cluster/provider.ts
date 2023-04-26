import { Provider } from '@pulumi/kubernetes'
import { kubeconfig } from './cluster'

export const provider = new Provider('k8s-provider', {
  kubeconfig,
})

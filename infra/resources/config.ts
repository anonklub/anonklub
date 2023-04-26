import * as pulumi from '@pulumi/pulumi'

// Get some provider-namespaced configuration values
const providerCfg = new pulumi.Config('gcp')
export const gcpProject = providerCfg.require('project')
export const gcpRegion = providerCfg.get('region') ?? 'europe-west3'

// Get some other configuration values or use defaults
export const cfg = new pulumi.Config()
export const nodesPerZone = cfg.getNumber('nodesPerZone') ?? 1
export const isMinikube = cfg.getBoolean('isMinikube') ?? false

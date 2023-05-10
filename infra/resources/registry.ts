import { container } from '@pulumi/gcp'

const registry = new container.Registry('registry', { location: 'EU' })
export const registryUrl = registry.id.apply(async (_) =>
  container.getRegistryRepository().then((reg) => reg.repositoryUrl),
)

// FIXME: had to set registry visibility to public manually in GCP web console
// how to be able to pull from private registry with pulumi?

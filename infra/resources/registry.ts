import { container } from '@pulumi/gcp'

export const registry = new container.Registry('registry')
export const registryUrl = registry.id.apply(async (_) =>
  container.getRegistryRepository().then((reg) => reg.repositoryUrl),
)

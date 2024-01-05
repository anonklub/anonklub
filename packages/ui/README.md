## Build

```shell
pnpm run build.docker.ui
```

## Run

```shell
docker run -p 3000:3000 anonklub-ui
```

## Deploy

```shell
# in monorepo root folder
fly deploy \
    --config ui/fly-staging.toml \
    --dockerfile ui/Dockerfile \
    --local-only # often getting errors when  using fly remote builder
```

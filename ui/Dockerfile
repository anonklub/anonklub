FROM node:19-alpine as base

RUN apk update && apk upgrade && apk add dumb-init
WORKDIR /app

FROM base as deps

COPY pnpm-lock.yaml package.json lerna.json pnpm-workspace.yaml ./
COPY ui/package.json ./ui/

RUN  npm i -g pnpm lerna && pnpm i --filter @anonset/ui

FROM deps as build

COPY ui/ ./ui
COPY --from=deps /app/node_modules ./node_modules

RUN lerna run build --scope @anonset/ui

# pnpm prune command doesn't support recursive execution on monorepo
# need to remove and re install only prod deps manually
RUN rm -rf node_modules node_modules ui/node_modules &&\
    pnpm i --filter @anonset/ui --prod &&\
    # remove all non prod deps from store/ reduce cache size
    pnpm store prune

FROM base as deploy

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/ui/node_modules ./ui/node_modules
COPY --from=build /app/ui/.next ./ui/.next

ENV NODE_ENV production

EXPOSE 3000

WORKDIR /app/ui

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node_modules/.bin/next", "start"]

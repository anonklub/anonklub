FROM node:19-alpine as base

RUN apk update && apk upgrade && apk add dumb-init && apk add --no-cache bash
WORKDIR app

FROM base as deps

COPY *.json *.yaml .npmrc global.d.ts ./
COPY query-api/package.json ./query-api/

RUN npm i -g pnpm && pnpm i --filter @anonklub/query-api


FROM deps as build

COPY tsconfig.json ./
COPY query-api/ ./query-api

# TODO: include build.graph step?
# would need to manage GRAPH_API_KEY as a secret in docker build

# pnpm prune command doesn't support recursive execution on monorepo
# need to remove and re install only prod deps manually
RUN pnpm --filter @anonklub/query-api run build  &&\
    rm -rf node_modules query-api/node_modules &&\
    pnpm --filter @anonklub/query-api i --prod

FROM base as deploy

# FIX ME: fix mkdir access when running as non root user
# https://github.com/nodejs/docker-node/issues/740
#WORKDIR /home/node/app
ARG DIR=query-api

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/$DIR/node_modules ./$DIR/node_modules
COPY --from=build /app/$DIR/dist ./$DIR/dist
COPY --from=build /app/$DIR/public ./$DIR/public

ENV NODE_ENV production
#USER node
EXPOSE 3000

WORKDIR /app/$DIR

# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# invoke node directly with execfrom notation so that process is not wrapped in a shell
# this allows signals to be passed to the node process
# also use dumb-init to avoid node running as PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist"]

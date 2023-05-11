FROM node:19-alpine as base

RUN apk update && apk upgrade && apk add dumb-init
WORKDIR app

FROM base as deps

COPY pnpm-lock.yaml package.json lerna.json pnpm-workspace.yaml .npmrc ./
COPY apis/query/package.json ./apis/query/

RUN npm i -g lerna pnpm && pnpm i --filter @anonset/query-api


FROM deps as build

COPY apis/query/ ./apis/query

# TODO: include build.graph step?
# would need to manage GRAPH_API_KEY as a secret in docker build
RUN lerna run build.js --scope @anonset/query-api

# pnpm prune command doesn't support recursive execution on monorepo
# need to remove and re install only prod deps manually
RUN rm -rf node_modules apis/query/node_modules &&\
    pnpm i --filter @anonset/query-api --prod

FROM base as deploy

# FIX ME: fix mkdir access when running as non root user
# https://github.com/nodejs/docker-node/issues/740
#WORKDIR /home/node/app
ARG DIR=apis/query

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/$DIR/node_modules ./$DIR/node_modules
COPY --from=build /app/$DIR/dist ./$DIR/dist
COPY --from=build /app/$DIR/public ./$DIR/public
COPY --from=build /app/$DIR/openapi.yaml /app/$DIR/package.json ./$DIR/

ENV NODE_ENV production
#USER node
EXPOSE 3000

WORKDIR /app/$DIR

# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# invoke node directly with execfrom notation so that process is not wrapped in a shell
# this allows signals to be passed to the node process
# also use dumb-init to avoid node running as PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "-r", "module-alias/register", "dist"]

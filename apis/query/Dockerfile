FROM node:19-alpine as base

RUN apk update && apk add dumb-init
WORKDIR app

FROM base as deps

COPY pnpm-lock.yaml package.json lerna.json pnpm-workspace.yaml .npmrc ./
COPY apis/query/package.json ./apis/query/

RUN npm i -g lerna pnpm && pnpm i --filter @anonset/query-api


FROM deps as build

COPY apis/query/ ./apis/query

RUN lerna run build --scope @anonset/query-api

# pnpm prune command doesn't support recursive execution on monorepo
# need to remove and re install only prod deps manually
RUN rm -rf node_modules apis/query/node_modules &&\
    pnpm i --filter @anonset/query-api --prod

FROM base as deploy

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apis/query/node_modules ./apis/query/node_modules
COPY --from=build /app/apis/query/dist ./apis/query/dist
COPY --from=build /app/apis/query/public ./apis/query/public
COPY --from=build /app/apis/query/openapi.yaml ./apis/query/openapi.yaml

ENV NODE_ENV=production
USER node
EXPOSE 3000

# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# invoke node directly with execfrom notation so that process is not wrapped in a shell
# this allows signals to be passed to the node process
# also use dumb-init to avoid node running as PID 1

CMD ["dumb-init", "node", "-r", "module-alias/register", "./apis/query/dist"]

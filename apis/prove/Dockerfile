FROM node:19-alpine as base

WORKDIR /app
RUN apk update && apk add dumb-init

FROM base as deps

COPY pnpm-lock.yaml package.json lerna.json pnpm-workspace.yaml ./
COPY apis/prove/package.json ./apis/prove/
COPY membership/*.json ./membership/

RUN npm i -g pnpm lerna && pnpm i

FROM deps as build

COPY apis/prove/ ./apis/prove
COPY membership/ ./membership
#COPY --from=deps /app/node_modules ./node_modules

RUN lerna run build --scope '{@anonset/membership,@anonset/prove-api}' && pnpm prune --prod

FROM base as deploy

COPY --from=build /app/apis/prove/dist ./dist
# FIXME
COPY --from=build /app/apis/prove/node_modules ./node_modules

ENV NODE_ENV=production
USER node
EXPOSE 3000

# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# invoke node directly with execfrom notation so that process is not wrapped in a shell
# this allows signals to be passed to the node process
# also use dumb-init to avoid node running as PID 1

# FIXME: pnpm use soft links so module alias won't be found
CMD ["dumb-init", "node", "-r" , "module-alias/register", "./dist"]




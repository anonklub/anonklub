FROM node:19-alpine as base

WORKDIR /app
RUN apk update && apk add dumb-init

FROM base as deps

COPY *.json *.yaml ./
COPY apis/prove/package.json ./apis/prove/
COPY membership/*.json ./membership/

RUN npm i -g pnpm lerna && pnpm i --filter @anonset/prove-api...

FROM deps as build

COPY apis/prove/ ./apis/prove
COPY membership/ ./membership

RUN lerna run build --scope '{@anonset/membership,@anonset/prove-api}' &&\
    rm -rf node_modules apis/prove/node_modules membership/node_modules &&\
    pnpm i --filter @anonset/prove-api... --prod

FROM base as deploy

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/membership/node_modules ./membership/node_modules
COPY --from=build /app/membership/dist ./membership/dist

COPY --from=build /app/apis/prove/node_modules ./apis/prove/node_modules
COPY --from=build /app/apis/prove/dist ./apis/prove/dist
COPY --from=build /app/apis/prove/public ./apis/prove/public
COPY --from=build /app/apis/prove/openapi.yaml /app/apis/prove/package.json ./apis/prove/

ENV NODE_ENV=production
# FIX ME: fix mkdir access when running as non root user
#USER node
EXPOSE 3000

WORKDIR /app/apis/prove
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# invoke node directly with execfrom notation so that process is not wrapped in a shell
# this allows signals to be passed to the node process
# also use dumb-init to avoid node running as PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist"]




FROM node:19-alpine as base

RUN apk update && apk upgrade && apk add dumb-init && apk add --no-cache bash
WORKDIR app

FROM base as deps

COPY *.json *.yaml global.d.ts .npmrc ./
COPY ui/package.json ./ui/
COPY @anonklub/proof/package.json ./@anonklub/proof/

RUN  npm i -g pnpm && pnpm i --filter @anonklub/ui...

FROM deps as build

ARG NEXT_PUBLIC_PROVE_API_URL
ARG NEXT_PUBLIC_QUERY_API_URL
ARG NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
ARG NEXT_PUBLIC_VERIFIER_ADDRESS
ARG NEXT_PUBLIC_VERIFIER_CHAIN_ID

COPY ui/ ./ui
COPY @anonklub/proof/ ./@anonklub/proof

RUN pnpm --filter @anonklub/ui... build  &&\
    rm -rf {./,@anonklub/proof,ui}/node_modules &&\
    pnpm --filter @anonklub/ui... i --prod

FROM base as deploy

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/@anonklub/proof/node_modules ./@anonklub/proof/node_modules
COPY --from=build /app/@anonklub/proof/dist ./@anonklub/proof/dist

COPY --from=build /app/ui/node_modules ./ui/node_modules
COPY --from=build /app/ui/.next ./ui/.next
COPY --from=build /app/ui/public ./ui/public

ENV NODE_ENV production

EXPOSE 3000

WORKDIR /app/ui

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node_modules/.bin/next", "start"]

FROM node:19-alpine as base

RUN apk update && apk upgrade && apk add dumb-init
WORKDIR app

FROM base as deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY ui/package.json ./ui/
COPY membership/package.json ./membership/

RUN  npm i -g pnpm && pnpm i --filter @anonset/ui...

FROM deps as build

ARG NEXT_PUBLIC_PROVE_API_URL
ARG NEXT_PUBLIC_QUERY_API_URL
ARG NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
ARG NEXT_PUBLIC_VERIFIER_ADDRESS
ARG NEXT_PUBLIC_VERIFIER_CHAIN_ID

COPY ui/ ./ui
COPY membership/ ./membership

RUN pnpm --filter @anonset/ui... build  &&\
    rm -rf {./,membership,ui}/node_modules &&\
    pnpm --filter @anonset/ui... i --prod

FROM base as deploy

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/membership/node_modules ./membership/node_modules
COPY --from=build /app/membership/dist ./membership/dist

COPY --from=build /app/ui/node_modules ./ui/node_modules
COPY --from=build /app/ui/.next ./ui/.next
COPY --from=build /app/ui/public ./ui/public

ENV NODE_ENV production

EXPOSE 3000

WORKDIR /app/ui

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node_modules/.bin/next", "start"]

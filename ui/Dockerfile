FROM node:19-alpine as base

RUN apk update && apk upgrade && apk add dumb-init && apk add --no-cache bash
WORKDIR app

FROM base as deps

COPY *.json *.yaml global.d.ts .npmrc ./
# necessary to successfully install node deps because local test pkg is part of dev deps
COPY test ./test
COPY ui/package.json ./ui/

RUN  npm i -g pnpm && pnpm i --filter @anonklub/ui

FROM deps as build

ARG NEXT_PUBLIC_QUERY_API_URL
ARG NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
ARG NEXT_PUBLIC_VERIFIER_ADDRESS
ARG NEXT_PUBLIC_VERIFIER_CHAIN_ID

COPY ui/ ./ui

RUN pnpm --filter @anonklub/ui build.ci  &&\
    rm -rf {./,ui}/node_modules &&\
    pnpm --filter @anonklub/ui i --prod

FROM base as deploy

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/ui/node_modules ./ui/node_modules
COPY --from=build /app/ui/.next ./ui/.next
COPY --from=build /app/ui/public ./ui/public
# Link wasm files to .next/server/static as webpack5 breaks dynamic imports
# see https://github.com/vercel/next.js/issues/25852#issuecomment-1057059000
RUN ln -s ./ui/.next/server/{chunks/},static

ENV NODE_ENV production

EXPOSE 3000

WORKDIR /app/ui

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node_modules/.bin/next", "start"]

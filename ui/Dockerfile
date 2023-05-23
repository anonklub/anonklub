FROM node:19-alpine as base

RUN apk update && apk upgrade && apk add dumb-init
WORKDIR app

FROM base as deps

COPY lerna.json package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY ui/package.json ./ui/
COPY membership/package.json ./membership/

RUN  npm i -g pnpm lerna && pnpm i --filter @anonset/ui...

FROM deps as build

COPY ui/ ./ui
COPY membership/ ./membership

RUN lerna run build --scope '{@anonset/membership,@anonset/ui}' &&\
    rm -rf {./,membership,ui}/node_modules &&\
    pnpm i --filter @anonset/ui... --prod

FROM base as deploy

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/membership/node_modules ./membership/node_modules
COPY --from=build /app/membership/dist ./membership/dist

COPY --from=build /app/ui/node_modules ./ui/node_modules
COPY ui/public ./ui/public
COPY --from=build /app/ui/.next ./ui/.next

ENV NODE_ENV production

EXPOSE 3000

WORKDIR /app/ui

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node_modules/.bin/next", "start"]

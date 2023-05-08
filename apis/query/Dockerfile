FROM node:19-alpine as base

RUN apk update && apk apk add --no-cache bash  && npm i -g pnpm lerna
WORKDIR app

FROM base as deps

COPY pnpm-lock.yaml package.json lerna.json pnpm-workspace.yaml .npmrc ./
COPY apis/query/package.json ./apis/query/

RUN pnpm i

FROM deps as build

COPY apis/query/ ./apis/query
COPY --from deps /app/node_modules ./node_modules/

RUN lerna run build --scope @anonset/query && pnpm prune --prod

FROM node:19-alpine as prod

COPY --from=build /app/apis/query/dist /app
EXPOSE 3000
CMD ["pnpm", "run" , "start.prod"]

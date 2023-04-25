FROM node:19-alpine as base

WORKDIR /app
RUN npm i -g pnpm lerna

FROM base as deps

COPY pnpm-lock.yaml package.json lerna.json pnpm-workspace.yaml ./
COPY ui/package.json ./ui/

RUN pnpm i

FROM deps as build

COPY ui/ ./ui
COPY --from=deps /app/node_modules ./node_modules

RUN lerna run build --scope @anonset/ui && pnpm prune --prod

FROM nginx:1.24-alpine as deploy

COPY --from=build /app/ui/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

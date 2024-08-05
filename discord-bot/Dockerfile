ARG DIR=discord-bot

FROM node:19-alpine as base
RUN apk update && apk upgrade && apk add dumb-init
WORKDIR app

FROM base as deps
ARG DIR
COPY *.json *.yaml .npmrc global.d.ts ./
COPY test/package.json ./test/
COPY $DIR/package.json ./$DIR/
# FIXME: using different versions of typescript at root level and in discord-bot
RUN npm i -g pnpm &&\
    pnpm i --filter $DIR --ignore-scripts &&\
    pnpm remove typescript &&\
    pnpm add -Dw typescript@5.1.6

FROM deps as build
ARG DIR
COPY ./$DIR/ ./$DIR/
# pnpm prune command doesn't support recursive execution on monorepo
# need to remove and re install only prod deps manually
RUN pnpm --filter $DIR build &&\
    rm -rf {./.$DIR}/node_modules &&\
    pnpm --filter $DIR i --prod

FROM base as deploy
ARG DIR
# FIX ME: fix mkdir access when running as non root user
# https://github.com/nodejs/docker-node/issues/740
#WORKDIR /home/node/app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/$DIR/node_modules ./$DIR/node_modules
COPY --from=build /app/$DIR/package.json ./$DIR/
COPY --from=build /app/$DIR/dist ./$DIR/dist

ENV NODE_ENV production
ENV NODE_PATH dist
WORKDIR /app/$DIR

# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# invoke node directly with execfrom notation so that process is not wrapped in a shell
# this allows signals to be passed to the node process
# also use dumb-init to avoid node running as PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "-r", "module-alias/register", "dist"]

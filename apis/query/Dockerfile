FROM node:19-alpine

RUN npm i -g pnpm

WORKDIR app

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY .key.json .
COPY tsconfig.json .
COPY package-scripts.yaml .
COPY src src

EXPOSE 3000

CMD ["npm", "run" ,"nps", "transpile", "start.prod"]

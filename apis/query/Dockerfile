FROM node:19-alpine

RUN apk update
RUN apk add python3 \
            python3-dev \
            gcc \
            libc-dev \
            py3-pip \
            bash

RUN pip install duneapi==7.0.0

RUN npm i -g pnpm

WORKDIR app

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm i -P --frozen-lockfile --ignore-scripts --reporter=silent

COPY tsconfig.json .
COPY dist dist
COPY src/lib/dune/query.py dist/lib/dune

EXPOSE 3000

COPY secrets-entrypoint.sh /usr/local/bin/secrets-entrypoint.sh
RUN chmod +x /usr/local/bin/secrets-entrypoint.sh
ENTRYPOINT ["secrets-entrypoint.sh"]

CMD ["npm", "run" , "start.prod"]

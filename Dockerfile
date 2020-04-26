FROM node:lts-alpine

RUN mkdir -p /home/node/portifolia-api/node_modules && chown -R node:node /home

WORKDIR /home/node/portifolia-api

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

RUN yarn start:dev

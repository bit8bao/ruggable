# Dockerfile for Inventory API

FROM node:11-alpine
WORKDIR /usr/src/app

COPY ./api/.npmrc .npmrc  
COPY ./api/package.json package.json

ENV TYPEORM_SYNCHRONIZE=false
ENV TYPEORM_LOGGING=false
ENV TYPEORM_ENTITIES=source/entity/**/*.ts

COPY ./api/ .

RUN yarn install
RUN yarn generate

EXPOSE 4004

CMD ["yarn", "start"]
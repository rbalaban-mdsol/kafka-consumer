FROM node:18-alpine as base
WORKDIR /opt/app

COPY . .
RUN apk add --no-cache git && apk add --no-cache openssh
RUN npm install

WORKDIR /opt/app
RUN npm install --legacy-peer-deps
EXPOSE 8080
CMD npm run start
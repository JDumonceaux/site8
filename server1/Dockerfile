FROM node:16.13.0-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY .npmrc ./

RUN npm install --production

COPY dist/. /usr/src/app

EXPOSE 8080

ENV NODE_PATH /usr/src/app

CMD [ "node", "-r", "dotenv/config", "server.js" ]
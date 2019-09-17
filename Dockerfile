FROM node

WORKDIR /app

COPY ./server ./server
COPY ./app.js ./app.js
COPY ./package.json ./package.json


RUN  npm install -g npm && npm install

ENTRYPOINT  ["node","server/server.js"]


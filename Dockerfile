FROM node

WORKDIR /app

COPY . .

RUN npm start
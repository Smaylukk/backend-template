FROM node:18.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@9.4.2
RUN npm install

COPY . .

CMD [ "npm", "start" ]

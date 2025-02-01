FROM node:18

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD ["node", "dist/modules/main/main.js"]
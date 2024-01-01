FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY next.config.js ./next.config.js

COPY public ./public

COPY . .

# RUN yarn prisma generate

RUN yarn run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

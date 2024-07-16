FROM node:20

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/main"]

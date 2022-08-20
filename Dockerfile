FROM node:16.15.0-alpine
RUN export NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
RUN npm i -g pm2@latest
COPY . /app

RUN yarn install
RUN yarn lint
RUN yarn compile
EXPOSE 3000

CMD ["pm2", "start", "dist/index.js", "--name", "kelinci-mq", "--no-daemon"]

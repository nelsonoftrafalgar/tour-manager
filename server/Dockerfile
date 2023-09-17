FROM node:16
WORKDIR /app
COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install
COPY ./server .
COPY ./.env .
EXPOSE 8000
CMD ["yarn", "start:dev"]

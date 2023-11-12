FROM node:18-alpine
WORKDIR /app
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install
COPY ./client .
EXPOSE 3000
CMD ["yarn", "dev"]

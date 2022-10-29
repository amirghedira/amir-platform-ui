FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build 

FROM node:16-alpine as serve
WORKDIR /app
COPY --from=builder  /app/.next/ /app/.next

EXPOSE 3000

CMD [ "npm", "start" ]

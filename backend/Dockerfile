FROM node:16.18.1-alpine

WORKDIR /app

COPY . .

RUN npm install -g nodemon

RUN npm i

EXPOSE 8090

CMD ["npm", "run", "dev"]

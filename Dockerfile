FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# não copia server.js porque vamos usar bind mount em dev
EXPOSE 3000

CMD ["npm", "start"]

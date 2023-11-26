FROM node:18-alpine

WORKDIR /app

COPY pokefront/package*.json ./

RUN npm install

COPY pokefront/. .

RUN npm run build

CMD ["npm", "run", "serve"]

FROM node:18

WORKDIR /app
COPY build .
RUN npm install mysql2
CMD node index.js

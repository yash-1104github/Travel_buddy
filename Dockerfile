#import node
FROM node:20 AS build

WORKDIR /app

COPY  package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE  4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
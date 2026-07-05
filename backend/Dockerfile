FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

RUN npm run dev

EXPOSE 3000

CMD ["npm", "run", "dev"]
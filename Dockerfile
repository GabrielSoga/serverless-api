FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
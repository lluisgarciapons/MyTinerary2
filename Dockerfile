FROM node:10

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm install

COPY . ./

CMD npm start

EXPOSE 5000
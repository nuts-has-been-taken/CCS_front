FROM node:14

WORKDIR /CCS_front

COPY . .

RUN npm install --save @fortawesome/fontawesome-svg-core
RUN npm install
FROM node:20-alpine

COPY ./secrets /app/secrets
COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
COPY ./tsconfig.json /usr/src/app/tsconfig.json
COPY ./src /usr/src/app/src
# Set working directory
WORKDIR /usr/src/app
EXPOSE 3000

RUN npm i -g @nestjs/cli 
# && npm install --save @nestjs/typeorm typeorm pg
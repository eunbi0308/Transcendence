FROM node:20-alpine

COPY ./secrets /app/secrets
EXPOSE 3000

RUN npm i -g @nestjs/cli 
# && npm install --save @nestjs/typeorm typeorm pg
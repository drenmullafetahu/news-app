FROM node:17-alpine as builder
WORKDIR /app/frontend

COPY . .
RUN npm install --force
RUN npm install react-scripts

EXPOSE 3000
CMD npm start
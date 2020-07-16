### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM staticfloat/nginx-certbot
ENV CERTBOT_EMAIL flaviojmendes@gmail.com
COPY ./nginx.conf /etc/nginx/user.conf.d/
COPY --from=build /usr/src/app/dist/mamuska /usr/share/nginx/html

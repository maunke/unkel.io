FROM node:lts AS build
WORKDIR /app
COPY package*.json ./

RUN curl -fsSL https://d2lang.com/install.sh | sh -s

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN chmod -R a+rX /usr/share/nginx/html
EXPOSE 8080

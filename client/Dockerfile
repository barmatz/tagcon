FROM node:14 as tagcon-client-build
WORKDIR /client/
ENV PATH ./node_modules/.bin:$PATH
COPY package*.json /client/
RUN yarn
COPY . /client/
RUN yarn build

FROM nginx:alpine
COPY --from=tagcon-client-build /client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
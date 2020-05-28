FROM node:14 as tagcon-api-build
WORKDIR /api/
COPY package*.json /api/
RUN yarn
COPY . /api/
EXPOSE 9000
CMD ["yarn", "start"]
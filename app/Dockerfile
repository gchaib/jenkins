FROM node:8.8

WORKDIR /app

copy package.json yarn.* /app/
copy src /app/src

RUN yarn

CMD ["npm", "start"]

FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Copy all the files
COPY . .

EXPOSE 5173
CMD ["yarn", "dev", "--host"]
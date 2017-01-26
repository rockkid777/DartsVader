FROM node:7.4.0
LABEL version="1.0"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

CMD [ "npm", "start" ]

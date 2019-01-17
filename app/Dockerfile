# Using the Node 11 Image
FROM node:11-alpine

MAINTAINER me@tomjuddcooper.co.uk

# Set Working Directory
WORKDIR /app

# Copy Files
COPY . /app

# Install Yarn Package Manager
RUN npm install -g yarn

# Yarn Install
RUN yarn --pure-lockfile

# Expose Ports
EXPOSE 3000
EXPOSE 9000

ENTRYPOINT ["npm", "start"]
# Install Node Image
FROM node:12.2.0-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json files inside the application directory
COPY ./package*.json /app/ 

# Install dependencies
RUN npm install -g node-gyp

RUN npm install

# Copy everything
COPY . .

# Expose the port 4000
EXPOSE 4000

# Start the server
CMD ["npm","start"]
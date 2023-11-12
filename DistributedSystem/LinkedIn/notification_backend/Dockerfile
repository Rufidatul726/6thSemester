# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose a port that your application will listen on (if applicable)
EXPOSE 5003

# Define the command to run your application
CMD [ "node", "server.js" ]

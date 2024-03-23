FROM node:20-alpine3.16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files to /app
COPY . .

# Set environment variables
ENV PORT=8001
ENV MONGODB_URI=mongodb://iamadmin:thisIsMongo@localhost:8005/mydb

# Expose port 8001 for the container
EXPOSE 8001

# Start the app
CMD ["npm", "start"]

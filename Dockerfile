# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files from frontend-next
COPY frontend-next/package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend-next directory
COPY frontend-next/ .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 
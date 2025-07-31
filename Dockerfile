# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from frontend-next
COPY frontend-next/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the frontend-next application
COPY frontend-next/ .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment variable for port
ENV PORT=3000

# Start the application
CMD ["npm", "start"] 
# Frontend Dockerfile

# Get the base image (Node)
FROM node:20

# Set the workdir to /app
WORKDIR /app

# Copy requirements and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .
CMD ["npm", "start"]
EXPOSE 3000

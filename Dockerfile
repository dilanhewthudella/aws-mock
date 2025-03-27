# Stage 1: Build
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run
FROM node:18 AS runner

WORKDIR /usr/src/app

# Copy built files from the builder stage
COPY --from=builder /usr/src/app ./

# Expose the application port (matching the port in main.ts)
EXPOSE 3000

# Run the application
CMD ["node", "dist/main"]

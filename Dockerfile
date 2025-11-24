# ----------------------------------------
# Stage 1: Build Stage
# ----------------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package definition
COPY package*.json ./

# Install ALL dependencies (including devDependencies for tsc/tsc-alias)
RUN npm ci

# Copy source code
COPY . .

# Build the project (Runs tsc && tsc-alias)
# This creates the /dist folder with resolved paths
RUN npm run build

# ----------------------------------------
# Stage 2: Production Run Stage
# ----------------------------------------
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package definition again
COPY package*.json ./

# Install ONLY production dependencies (Saves space)
RUN npm ci --only=production

# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Create a non-root user for security
USER node

# Expose the port (Render handles mapping this externally)
EXPOSE 3000

# Start the server using the compiled JS file
CMD ["node", "dist/server.js"]
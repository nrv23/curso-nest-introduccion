# Install dependencies only when needed
FROM node:18-alpine3.18 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Build the app with cache dependencies
FROM node:18-alpine3.18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine3.18 AS runner

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm install --only=prod

# Copy build output from builder stage
COPY --from=builder /app/dist ./dist

# Copy .env file (adjust the path according to your project structure)
COPY .env .env

# Expose port if needed (uncomment and adjust if necessary)
# EXPOSE 3000

# Command to run your application
CMD ["node", "dist/main"]

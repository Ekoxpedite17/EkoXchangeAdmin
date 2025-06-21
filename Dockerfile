FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock
COPY package.json .
COPY package-lock.json* yarn.lock* ./

# Install dependencies
RUN npm ci || yarn install --frozen-lockfile

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3001

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

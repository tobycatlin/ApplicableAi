FROM node:20-alpine3.16

RUN npm install -g pnpm

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json  ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .
RUN npx prisma generate
# Expose the port Next.js runs on (usually 3000)
EXPOSE 3000

# Set environment variable to force Next.js to listen on all interfaces
ENV HOST=0.0.0.0

# Start the Next.js development server
CMD ["npm", "run", "dev"]
FROM node:16-alpine

WORKDIR /app

COPY . .

# Install all node dependencies in package-lock.json
RUN npm ci

# Doesn't really do anything; to expose we need to still pass the option in docker run or in the docker-compose
# This is more for documentation
EXPOSE 3000

CMD ["npm", "run", "start"]
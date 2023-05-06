FROM node:16-alpine

WORKDIR /app

COPY . .

# Install all node dependencies in package-lock.json
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start"]
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3001

CMD ["npm", "start", "--", "--port", "3001", "--host", "0.0.0.0"]
FROM node:26.13.1-slim
WORKDIR /app
RUN npm install --global npm@12.2.3
COPY package.json package-lock.json .nvmrc ./
RUN npm ci --no-fund
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"]

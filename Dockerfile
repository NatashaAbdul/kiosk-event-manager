
# Dockerfile for client

# Stage 1: Build react client
FROM node:14.6.0

# Working directory be app
WORKDIR /usr/app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY package-lock.json ./


# Install dependencies
RUN npm install --production
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

RUN ls

RUN npm run build

# copy local files to app folder

RUN ls

RUN npm install -qy

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]

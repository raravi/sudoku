FROM anapsix/alpine-java
WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start"]

FROM node:14.19.0
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3333
CMD ["npm", "run","dev"]

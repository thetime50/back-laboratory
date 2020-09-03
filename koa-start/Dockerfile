FROM node:10.5.0
LABEL author="Lb 13508676924@163.com"
ENV PORT=58888
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
COPY . /app
EXPOSE ${PORT}
CMD node index.js thetime-mongodb

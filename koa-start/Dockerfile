FROM node:10.5.0
LABEL author="Lb 13508676924@163.com"
ENV PORT=58888
WORKDIR /app
EXPOSE ${PORT}

# COPY ./package.json /app/package.json
# RUN npm install
# COPY . /app
# EXPOSE ${PORT}
# CMD npm run start

RUN npm install
CMD node index.js koa.thetime50.com

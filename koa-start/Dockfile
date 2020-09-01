# 和我们上篇没什么区别哈
FROM node:14.9.0
LABEL author="Lb 13508676924@163.com"
ENV PORT=8888
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE ${PORT}
CMD npm run dev
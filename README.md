# back-laboratory
back-laboratory

## koa-poplar
页面预览 http://thetime50.com/front-server-laboratory/koa-poplar/dist/index.html#/home  
前端项目 [front-server-laboratory/koa-poplar](../front-server-laboratory/tree/master/koa-poplar)  
后端项目 [back-laboratory/koa-start](../back-laboratory/tree/master/koa-start)  


## 本地mongodb安装配置
```cmd
::创建数据目录
mkdir d:\data\db
mkdir d:\data\log

::命令行下运行 MongoDB 服务器
"E:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath d:\data\db

::连接MongoDB
"E:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"

```
```cfg
::mongod.cfg
systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db
```
```cmd
::安装 MongoDB服务
cd "E:\Program Files\MongoDB\Server\4.4\bin\"
mongod.exe --config "d:\mongodb\mongod.cfg" --install --serviceName "MongoDB"
net start MongoDB
net stop MongoDB
mongod.exe --remove

::MongoDB 后台管理 Shell
mongo
```

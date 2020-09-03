
## linux-install-node
```sh
curl -sL https://rpm.nodesource.com/setup_10.x | bash -
yum install -y nodejs
[root@localhost /]# node -v
```

[linux上node安装](https://www.jianshu.com/p/692bf774a353)

```sh
// 1.下载安装包
cd /usr/local/src/
wget https://nodejs.org/dist/v14.9.0/node-v14.9.0-linux-x64.tar.xz
tar zxvf node-v10.15.3.tar.gz

// 2.编译安装
cd node-v10.15.3
./configure --prefix=/usr/local/node/10.15.3
make
make install

// 3.配置NODE_HOME，进入profile编辑环境变量
vim /etc/profile 
// 设置 nodejs 环境变量，在 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL 一行的上面添加如下内容:
#set for nodejs
export NODE_HOME=/usr/local/node/10.15.3
export PATH=$NODE_HOME/bin:$PATH

// :wq保存并退出，编译/etc/profile 使配置生效
source /etc/profile

// 4.查看是否安装成功
node -v
```


[docker 部署node+mongodb](https://www.jianshu.com/p/36019a7a9290)

[下载docker-compose太慢解决方式](https://blog.csdn.net/baidu_21349635/article/details/104628772)  
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose  
sudo chmod +x /usr/local/bin/docker-compose

telnet koa.thetime50.com 180

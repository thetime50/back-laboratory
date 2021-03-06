const Koa = require('koa');
const cors = require('koa2-cors');
const app = new Koa();

// // 跨域
app.use(cors({
    origin:(ctx)=>{
        let host = ctx.request.host
        let domains = [
            /^localhost/,
            /^thetime50\.com\b/,
            /^\w*\.thetime50\.com\b/,
        ]
        let check = domains.findIndex((v,i,a)=>{
            return v.test(host)
        })
        if(check>=0){
            return '*'
        }
        return false
    },
    
    credentials: true,
    withCredentials:true,
}));

// throw
app.use(async (ctx, next) => {
    let old_throw = ctx.throw
    ctx.throw = (status, message, properties)=>{
        let ppt = properties || {}
        if(! ppt.headers){
            ppt.headers = {}
        }
        ppt.headers = {
            ...ctx.response.headers,
            ...ppt.headers
        }
        return old_throw(status, message, ppt)
    }
    await next();
})

//router
const Router = require('koa-router');

//父路由
const router = new Router();

//bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//引入数据库操作方法
const UserController = require('./server/controller/user.js');

//checkToken作为中间件存在
const checkToken = require('./server/token/checkToken.js');



app.use(async (ctx, next) => {
    await next();
    if (parseInt(ctx.status) === 404) {
        console.log('**404**', JSON.stringify(ctx.originalUrl, null, '  '))
    }
})



//登录
const loginRouter = new Router();
loginRouter.post('/login', UserController.Login);
//注册
const registerRouter = new Router();
registerRouter.post('/register', UserController.Reg);

//获取所有用户
const userRouter = new Router();
userRouter.get('/user', checkToken, UserController.GetAllUsers);
//删除某个用户
const delUserRouter = new Router();
delUserRouter.post('/delUser', checkToken, UserController.DelUser);

//装载上面四个子路由
function routerUse(path, parent, children) {
    parent.use(path, children.routes(), children.allowedMethods());
}
routerUse('/api', router, loginRouter)
routerUse('/api', router, registerRouter)
routerUse('/api', router, userRouter)
routerUse('/api', router, delUserRouter)

////////////////////////////////////////////////////////////////////////////////////////////////////

//引入数据库操作方法
const AnnotationController = require('./server/controller/annotation.js');

//获取所有用户
const annotationCreateRouter = new Router();
annotationCreateRouter.post('/create', checkToken, AnnotationController.Create);
//获取所有用户
const annotationUpdateRouter = new Router();
annotationUpdateRouter.post('/update', checkToken, AnnotationController.Update);
//获取所有用户
const annotationRetriveRouter = new Router();
annotationRetriveRouter.post('/retrive', checkToken, AnnotationController.Retrive);
//获取所有用户
const annotationDeleteRouter = new Router();
annotationDeleteRouter.post('/delete', checkToken, AnnotationController.Delete);

routerUse('/api/annotation', router, annotationCreateRouter)
routerUse('/api/annotation', router, annotationUpdateRouter)
routerUse('/api/annotation', router, annotationRetriveRouter)
routerUse('/api/annotation', router, annotationDeleteRouter)



//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(58888, () => {
    console.log('The server is running at http://localhost:' + 58888);
});


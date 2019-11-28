// express  koa  egg  java  php  python  go  
// express  koa  二选一
// mysql（表）  mongodb（集合）  orical  db2  .....
// mongodb 只能选mongodb  ORM  db.user.find()  mongoose

// java技术栈搭建api接口：SSM mysql
// 搭建api接口express技术栈：epxress  mongodb  body-parser  加密   jwt .....

// 服务端渲染：jsp  php  asp  模板引擎  out
// 之前写的cms是连接数据库，渲染模块，把数据直接填充到模板中

// 后端程序员：
// 党建也也需要搭建api接口  djserver  epxress  mongodb

// 前端程序员：
// 党建的后台管理系统（cms） vue-element-admin  vue技术栈  需要调用api接口
// 党建的移动端（webapp,小程序...） webapp   vue技术栈
// 党建的PC端（网站）
// 党建的原生端(android ios)
//     HTML5开发工程师   web前端开发工程师   webapp（vue，react）  pc  小程序  公众号

// 写接口 
// 用户管理的接口   注册用户  登录用户  删除用户   编辑用户  查询用户

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const db = require("./config/keys").mongoURL
const passport = require("passport")
const app = express()

// 连接数据库
mongoose.connect(db).then(()=>{
    console.log("数据库连接成功了....")
}).catch(err=>{
    console.log(err)
})

// 配置bodyParser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// app.get("/",(req,res)=>{
//     res.send("hello")
// })
// 引入二级路由文件
const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")

// 一级路由
app.use("/api/users",users)
app.use("/api/profile",profiles)

// 配置passport  配置passport代码量非常大   把配置抽离一个单独的文件
app.use(passport.initialize());  // 初始化
require("./config/passport")(passport)   // 导入配置文件  把passport传递过去


app.listen(3000,()=>{
    console.log("服务器运行成功...")
})  



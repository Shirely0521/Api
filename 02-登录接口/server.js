const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/djcms").then(()=>{
    console.log(`连接成功了...`)
}).catch(err=>{
    console.log(err)
})


// 引入user.js
const users = require("./routes/api/users")

// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 一级路由
app.use("/api/users",users)

const port = 3000
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})





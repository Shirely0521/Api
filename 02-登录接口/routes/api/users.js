const express = require("express")
const bcrypt = require('bcrypt');  // 加密密码
const User = require("../../model/User")
const router = express.Router();


router.get("/test",(req,res)=>{
    res.json({msg:"hello login"})
})

// 注册接口
router.post("/register",(req,res)=>{
    // console.log(req.body)
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            // 邮箱已经被注册
            return res.status(400).json("邮箱已经被注册")
        }else{
            const newUser = new User({
                name: req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) console.log(err) 
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user=>res.json(user))
                    .catch(err=>res.json(err))
                })
            })
        }
    })
})

// 登录接口
router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email}).then(user=>{
        if(!user){
            return res.status(404).json("用户不存在")
        }
        bcrypt.compare(password, user.password).then(isMatch=>{
            if(isMatch){
                res.json({msg:"success"})
            }else{
                return res.status(400).json("密码错误")
            }
        })
    })
})

module.exports = router
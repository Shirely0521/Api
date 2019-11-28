const express = require("express")
const passport = require("passport")
const router = express.Router()

const Profile = require("../../models/Profile")

// 如果没有带token去访问 默认返回Unauthorized
// 带上token去访问  
router.post("/add", passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {}
    profileFields.type  =  req.body.type
    profileFields.describe = req.body.describe
    profileFields.income = req.body.income

    new Profile(profileFields).save().then(profile=>{
        res.json(profile)
    })

})

// 获取所有的新闻数据
router.get("/list", passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find().then(profile=>{
        if(!profile){
            return res.status(404).json("没有任何内容")
        }
        res.json(profile)
    })
})

// 获取所有的新闻数据
router.get("/list/:id", passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id}).then(profile=>{
        if(!profile){
            return res.status(404).json("没有任何内容")
        }
        res.json(profile)
    })
})

// 编辑接口
router.post("/edit/:id", passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {}
    profileFields.type  =  req.body.type
    profileFields.describe = req.body.describe
    profileFields.income = req.body.income

    Profile.findOneAndUpdate({_id:req.params.id},{$set:profileFields},{new:true})
    .then(profile=>res.json(profile))
})

// 删除接口
router.get("/delete/:id", passport.authenticate("jwt",{session:false}),(req,res)=>{

    Profile.findOneAndDelete({_id:req.params.id}).then(profile=>{
        res.status(200).json("删除成功")
    })
})

module.exports = router
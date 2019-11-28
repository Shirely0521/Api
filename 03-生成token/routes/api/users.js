const express = require("express")
const bcrypt = require('bcrypt');  // 加密密码
const User = require("../../model/User")
const keys = require("../../config/keys")
var jwt = require('jsonwebtoken');
let passport = require("passport")
const router = express.Router();


router.get("/test", (req, res) => {
    res.json({ msg: "hello login" })
})

// 注册接口
router.post("/register", (req, res) => {
    // console.log(req.body)
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            // 邮箱已经被注册
            return res.status(400).json("邮箱已经被注册")
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err)
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => res.json(err))
                })
            })
        }
    })
})

// 登录接口
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json("用户不存在")
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // 把一用户的信息作为一个token 
                const rule = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(rule, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json("密码错误")
            }
        })
    })
})

// 获取用户信息接口
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
      });
    }
  );
module.exports = router
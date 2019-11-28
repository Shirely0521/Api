// 专门用来配置Passport  验证jwt   配置的话，搜索passport-jwt
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose")
const User = mongoose.model("users")  // 把User的model导入  操作users集合
const keys = require("../config/keys")

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey

module.exports = passport=>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        // console.log(jwt_payload)  // 保存了解析后的用户信息 
        // console.log(done)  // [Function: verified]
        User.findById(jwt_payload.id).then(user=>{
            if(user){
               return done(null,user)
            }
            return done(null,false)
        }).catch(err=>console.log(err))
    }));
}



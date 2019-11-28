const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    describe:{
        type:String,
        required:true
    },
    income:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = Profile = mongoose.model("profile",ProfileSchema)
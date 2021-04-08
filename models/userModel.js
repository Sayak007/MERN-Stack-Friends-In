const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{type: String, required: true, trim: true,maxlength: 25},
    username:{ type: String, required: true, trim: true, maxlength: 25, unique: true}, 
    email:{type: String,required: true,trim: true,unique: true}, 
    password: {type: String,required: true,}, 
    avatar:{type: String,default: 'https://images.vexels.com/media/users/3/147102/isolated/preview/082213cb0f9eabb7e6715f59ef7d322a-instagram-profile-icon-by-vexels.png'},
    role:{type: String,default: 'user',},
    gender:{type: String,default: 'male',},
    mobile:{type: String,default: '',},
    story:{type: String,default: '',maxlength: 200}, 
    website:{type: String,default: '',},
    followers:[{type: mongoose.Types.ObjectId, ref:'user'}],
    following:[{type: mongoose.Types.ObjectId, ref:'user'}],
}, {
    timestamps: true
})

module.exports = mongoose.model('user',userSchema)
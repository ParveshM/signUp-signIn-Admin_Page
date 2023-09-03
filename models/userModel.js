const mongoose=require('mongoose')
const schema= mongoose.Schema

const userSchema= new schema({

name:{
    type:String, 
    required: true
},
email:{
    type:String,
    required: true
},
password:{
    type:String,
    required: true
},
is_admin:{
    type:Boolean,
    default:false
}
},{timeStamps:true})

const user= mongoose.model('User',userSchema)
module.exports= user;

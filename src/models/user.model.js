import mongoose from 'mongoose'
const{Schema}=mongoose

const userShema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile_number:{
        type:String,
        required:true 
    },
    authType : {
        type: String,
        enum: ["Owner","Customer"],
        default :"Customer"
    },
    token: {
        type: String
    }


},{timestamps:true})

const user = mongoose.model("user",userShema)

export default user
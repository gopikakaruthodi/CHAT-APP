import mongoose from "mongoose";

const userSchema=await mongoose.Schema({
    username:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String},
    cpassword:{type:String},
    profile:{type:String}
})

export default mongoose.model.users||mongoose.model('user',userSchema)
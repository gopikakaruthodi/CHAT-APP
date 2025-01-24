import mongoose from "mongoose";

const messagesSchema=new mongoose.Schema({
    senderID:{type:String},
    receiverID:{type:String},
    message:{type:String},
    hashedMessage:{type:String},
    time:{type:String},
    encryptedMessage:{type:String},
    iv:{type:String},
    date:{type:String},
    read: { type: Boolean },
    timeStamp:{type:Date , default:Date.now()}
})

export default mongoose.model.messages || mongoose.model("message",messagesSchema);
import mongoose from "mongoose";

const chattedContactSchema=new mongoose.Schema({
    senderID:{type:String},
    receiverID:{type:String}
});

export default mongoose.model.chattedContacts || mongoose.model("chattedContact",chattedContactSchema);
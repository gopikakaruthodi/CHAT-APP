import userSchema from './models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import messagesSchema from './models/messages.model.js'
import chattedContactSchema from './models/chattedContacts.model.js'


const{sign}=jwt

const transporter = nodemailer.createTransport({
    service:"gmail",
     auth: {
       user: "jazzcazz02@gmail.com",
       pass: "huhm lfcr wtaj qgbg",
     },
   });
 

export async function signup(req,res) {
    try {
        const {...data}=req.body
        const {username,password,cpassword,email,phone,profile}=req.body
        // console.log(data);
        if(!(username&&email&&phone&&password&&cpassword&&profile))
            return res.status(404).send({msg:"Oops! You forgot to fill in the fields."})
        const user=await userSchema.findOne({email})
        
        if(user)
            return res.status(404).send({msg:"This email address is already registered."})
        if(password!=cpassword)
            return res.status(404).send({msg:"Passwords do not match. Please try again."})
        bcrypt.hash(password,10).then(async(hashedPassword)=>{
            // console.log(hashedPassword);
            await userSchema.create({username,password:hashedPassword,email,phone,profile}).then(()=>{
                res.status(201).send({msg:"Registration successful! You can now log in"})
            }).catch((error)=>{
                console.log(error); 
                return res.status(404).send({msg:error})
            })
        })
       
        
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error})
        
    }
    
}

export async function signin(req,res) {
    try {
        const {email,password}=req.body
        const user=await userSchema.findOne({email})
        if(!user)
            return res.status(404).send({msg:"This email address is not registered. Please check and try again."})
        const checkpassword=await bcrypt.compare(password,user.password)
        if(!checkpassword)
            return res.status(404).send({msg:"Invalid password. Please try again"})
        const token=await sign({userId:user._id},"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",{expiresIn:'24h'})
        // console.log(token);
        res.status(200).send({msg:"Welcome! You’re logged in now.",token})
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error})

        
    }
    
}

export async function checkEmail(req,res) {
    try {
        try {
            const {email}=req.body
            const info = await transporter.sendMail({
                from: 'jazzcazz02@gmail.com', // sender address
                to: `${email}`, // list of receivers
                subject: "Email Verification", // Subject line
                text: "Verification", // plain text body
                html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Verification</title>
            <style>
                body {
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #3d3d3d;
                    border-radius: 6px;
                }
                .email-container {
                    width: 100%;
                    max-width: 300px;
                    margin: 0 auto;
                    background-color: #eff7fa;
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                }
                .btn {
                    display: inline-block;
                    background-color: rgb(17, 161, 251);
                    color: #fff;
                    text-decoration: none;
                    padding: 10px 20px;
                    margin-top: 20px;
                    border-radius: 50px;
                    font-size: 18px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
    
            <div class="email-container">
                <p>Hello Sir/Madam</p>
                <p>Please verify your email address by clicking the button below.</p>
                <a href="http://localhost:5173/signup" class="btn">Verify Your Account</a>
            </div>
    
        </body>
        </html>`, // html body
              });
            
            res.status(200).send({msg:"Email verified successfully! You can now log in to your account."})
        } catch (error) {
            console.log(error);
            res.status(404).send({msg:error})    
                 
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error})  
    }
    
}

export async function changePassword(req,res) {
    try {
        const{password,cpassword,email}=req.body
        const user=await userSchema.findOne({email})
        if(!user)
            res.status(404).send({msg:"invalid user"})
         if(password!=cpassword)
            return res.status(404).send("Password Mismatch")
         bcrypt.hash(password,10).then(async(hashedPassword)=>{
            //  console.log(hashedPassword); 
             await userSchema.updateOne({email},{$set:{password:hashedPassword}}).then(()=>{
                 res.status(201).send({msg:"Your Password has been reset"})
             }).catch((error)=>{
                 res.status(404).send({msg:error})
             }) 
         }) 
    } catch (error) {
        console.log(error);
    } 
}

export async function displayUsers(req,res) {
   try {
    // console.log(req.user);
    const _id=req.user
    const user=await userSchema.findOne({_id},{username:1,profile:1})
    if(!user)
        res.status(404).send({msg:'Invalid user'})
    const data=await userSchema.find({_id:{$ne:_id}})
    // console.log(data);
    res.status(200).send({data,user})
    
   } catch (error) {
        console.log(error);
        
   }
}

export async function userProfile(req,res) {
   try {
    // console.log(req.user);
    const id=req.user
    const data = await userSchema.findOne({_id: id}, { profile: 1 });
    // console.log(data);
    res.status(200).send(data)
   } catch (error) {
        console.log(error);
        
   }
}

export async function edituser(req,res) {
   try {
    // console.log(req.user);
    const _id=req.user
    const {...uData}=req.body
    const data=await userSchema.updateOne({_id},{$set:{...uData}})
    // console.log(data);
    res.status(201).send({msg:'success'})
    
   } catch (error) {
        console.log(error);
        
   }
}

export async function displayUserProfile(req,res) {
   try {
    // console.log(req.user);
    const _id=req.user
    const data=await userSchema.findOne({_id})
    // console.log(data);
    res.status(200).send(data)
    
   } catch (error) {
        console.log(error);
        
   }
}

export async function addMessage(req,res) {
    try {
        const {receiverID}=req.params;
        const senderID=req.user;
        const {newMessage,date,time}=req.body;
        const chatPerson=await chattedContactSchema.findOne({senderID,receiverID});
        if(!chatPerson)
           await chattedContactSchema.create({senderID,receiverID})
        await messagesSchema.create({senderID,receiverID,message:newMessage,date,time,read:false}).then(()=>{
             res.status(201).send({msg:"success"});
        }).catch((error)=>{
         res.status(404).send({msg:"error"})
        })
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}

export async function chat(req,res) {
    try {
        const {receiverID}=req.params;
        const senderID=req.user;
        const receiver=await userSchema.findOne({_id:receiverID},{profile:1,username:1})
        const chats=await messagesSchema.find({$or:[{senderID,receiverID},{senderID:receiverID,receiverID:senderID}]});
        // console.log(chats);
        
        return res.status(200).send({chats,receiver,uid:senderID});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function getChaters(req, res) {
    try {
        const id = req.user;
        const user=await userSchema.findOne({_id:id},{username:1,profile:1})
        if(!user)
            res.status(404).send({msg:'Invalid user'})
        // Fetch all contacts where the user is either the sender or receiver
        const contacts = await chattedContactSchema.find({
            $or: [{ senderID: id }, { receiverID: id }]
        });

        // Fetch user details and last messages for all contacts
        const chatterDetails = await Promise.all(
            contacts.map(async (chat) => {
                // Determine the other user's ID
                const otherUserID = chat.receiverID === id ? chat.senderID : chat.receiverID;
                // console.log(otherUserID,id);
                
                // Fetch user details
                const user = await userSchema.findOne(
                    { _id: otherUserID },
                    { username: 1, profile: 1 } // Select only required fields
                );

                const unreadCount = await messagesSchema.countDocuments({$or:[
                    {senderID: otherUserID,
                    receiverID: id,
                    read: false}
                ]});

                // Fetch the last message between the two users
                const lastMessage = await messagesSchema.findOne({
                    $or: [
                        { senderID: id, receiverID: otherUserID },
                        { senderID: otherUserID, receiverID: id },
                    ],
                })
                    .sort({ timeStamp: -1 }) // Sort by date and time descending
                    .exec();

                // Combine user details with the last message
                return {
                    ...user._doc,
                    unreadCount,
                    lastMessage: lastMessage ? lastMessage.message : null,
                    lastMessageDate: lastMessage ? lastMessage.date : null,
                    lastMessageTime: lastMessage ? lastMessage.time : null,
                };
            })
        );

        // Filter out null results (if any user lookup failed)
        const filteredChatters = chatterDetails.filter((chatter) => chatter !== null);
        // console.log(filteredChatters);
        
        return res.status(200).send({filteredChatters,user});
    } catch (error) {
        console.error("Error in getChaters:", error);
        return res.status(404).send({ msg: "Error" });
    }
}

export async function openChat(req, res) {
    try {
        const sid= req.user
        const {receiverID} = req.params;      
        await messagesSchema.updateMany(
            { senderID:receiverID, receiverID:sid, read: false },
            { $set: { read: true } }
        ).then(()=>{
             res.status(200).send({ msg: "Messages marked as read." });
        }).catch((error)=>{
            console.error("Error in openChat:", error);
        })
    } catch (error) {
        console.error("Error in openChat:", error);
        return res.status(500).send({ msg: "Failed to mark messages as read." });
    }
}

export async function deleteMessage(req,res) {
    try {
        const {id}=req.params;
        const senderID=req.user;
        await messagesSchema.deleteOne({_id:id,senderID}).then(()=>{
            return res.status(200).send({msg:"success"});
        }).catch((error)=>{
            // console.log(error);
            return res.status(404).send({msg:"error"})
            
        })
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
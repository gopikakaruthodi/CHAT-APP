import jwt from 'jsonwebtoken'
const {verify}=jwt

export default async function Auth(req,res,next) {
    try {
        // console.log('-------------------');       
        // console.log(req.headers.authorization);
        const token=req.headers.authorization;
        // console.log(token);
        const key=token.split(" ")[1]
        // console.log(key);
       const auth=await verify(key,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
    //    console.log(auth);
       req.user=auth.userId
       next()
    } catch (error) {
        console.log(error);
        return res.status(404).send({msg:"Session Timeout,Please Login Again"})  
    }
    
}
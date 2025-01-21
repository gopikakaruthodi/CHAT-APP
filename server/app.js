import express from 'express'
import cors from 'cors'
import Connection from './connection.js'
import router from './router.js'

const app=express()

app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use('/api',router)

Connection().then(()=>{
    console.log('Database connected');
    
    app.listen(3002,()=>{
        console.log('server running at http://localhost:3002');  
    })
}).catch((error)=>{
    console.log(error);
})


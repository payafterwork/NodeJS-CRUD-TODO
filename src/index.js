const express =  require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const jwt = require('jsonwebtoken')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//Middleware between: new request > (middleware) > run route handler
app.use((req,res,next)=>{
    if(req.method == 'GET'){
    }else{
     next()
    }
})

//Maintainance Mode Middleware
// app.use((req,res,next)=>{
//     res.status(503).status('Site is currently down. Check back soon!')
// })

app.listen(port,()=>{
    console.log('Server is up on port'+port);
})
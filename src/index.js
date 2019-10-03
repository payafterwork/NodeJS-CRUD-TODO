const express =  require('express')
require('./db/mongoose')
const User =  require('./models/user')
const Task =  require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users',(request,res)=>{
    const user = new User(request.body)
    user.save().then(()=>{
       res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

app.post('/tasks',(request,res)=>{
    const task = new Task(request.body)
    task.save().then(()=>{
       res.status(201).send(task);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})
 
app.listen(port,()=>{
    console.log('Server is up on port'+port);
})
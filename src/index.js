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
        res.status(500).send();
    })
})

app.get('/users',(request,res)=>{
    User.find({}).then((users)=>{
       res.status(201).send(users);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


app.get('/users/:id',(request,res)=>{
   const _id = request.params.id
   User.findById(_id).then((user)=>{
     if(!user){
         return res.status(404).send();
     }
     res.send(user)
   }).catch((e)=>{
    return res.status(500).send()
   })
})


app.get('/tasks',(request,res)=>{
    Task.find({}).then((tasks)=>{
       res.status(201).send(tasks);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


app.get('/tasks/:id',(request,res)=>{
   const _id = request.params.id
   Task.findById(_id).then((task)=>{
     if(!task){
         return res.status(404).send();
     }
     res.send(task);
   }).catch((e)=>{
    return res.status(500).send()
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
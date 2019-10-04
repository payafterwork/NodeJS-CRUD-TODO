const express =  require('express')
require('./db/mongoose')
const User =  require('./models/user')
const Task =  require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async(request,res)=>{
    const user = new User(request.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
    
    // user.save().then(()=>{
    //    res.status(201).send(user);
    // }).catch((e)=>{
    //     res.status(500).send();
    // })
})

app.get('/users',async(request,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }    
    // User.find({}).then((users)=>{
    //    res.status(201).send(users);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })
})


app.get('/users/:id',async(request,res)=>{
   const _id = request.params.id
   try{
     const user = await User.findById(_id)
     if(!user){
        return res.status(404).send();
      }
      res.send(user)
    }catch(e){
     res.status(500).send()
   }
   
})


app.get('/tasks',async(request,res)=>{
   try{
     const tasks = await Task.find({})
     res.send(tasks)
   }catch(e){
     res.status(500).send(e)
   }
})


app.get('/tasks/:id',async(request,res)=>{
   const _id = request.params.id
   try{
     const task = await Task.findById(_id)
     if(!task){
         return res.status(404).send()
     }
     res.send(task)
   }catch(e){
     res.status(500).send(e)
   }
})


app.post('/tasks',async(request,res)=>{
    const task = new Task(request.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})
 
app.listen(port,()=>{
    console.log('Server is up on port'+port);
})
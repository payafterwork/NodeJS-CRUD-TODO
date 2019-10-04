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


app.patch('/users/:id',async(request,res)=>{  
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation =  updates.every((update)=>{
            return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
       return res.status(400).send({error:'Invalid updates!'}) 
    }
    try{
       const user =  await User.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})


app.patch('/tasks/:id',async(request,res)=>{  
    const updates = Object.keys(request.body) //To convert the object of being updated things into array and storing it in updates
    const allowedUpdates = ['description','completed'] //Adding those fields in array of strings which are allowed to be updated
    const isValidOperation =  updates.every((update)=>{ // For each update in updates comparing 
            return allowedUpdates.includes(update) //if allowedUpdates array includes the update the user is requesting to update
    })
    if(!isValidOperation){ //if update is not found in updates array we do this
       return res.status(400).send({error:'Invalid updates!'}) 
    }
    // else we go forward and update
    try{ 
       const task =  await Task.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

app.listen(port,()=>{
    console.log('Server is up on port'+port);
})
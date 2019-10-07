const express =  require('express')
const Task =  require('../models/task')
const router =  new express.Router()

router.get('/tasks',async(request,res)=>{
    try{
      const tasks = await Task.find({})
      res.send(tasks)
    }catch(e){
      res.status(500).send(e)
    }
 })
 
 
 router.get('/tasks/:id',async(request,res)=>{
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
 
 
 router.post('/tasks',async(request,res)=>{
     const task = new Task(request.body)
     try{
         await task.save()
         res.status(201).send(task)
     }catch(e){
         res.status(400).send(e)
     }
 })
 
 
 router.patch('/tasks/:id',async(request,res)=>{  
     const updates = Object.keys(request.body) //To convert the object of being updated things into array and storing it in updates
     const allowedUpdates = ['description','completed'] //Adding those fields in array of strings which are allowed to be updated
     const isValidOperation =  updates.every((update)=>{ // For each update in updates comparing 
             return allowedUpdates.includes(update) //if allowedUpdates array includes the update the user is requesting to update
     })
     if(!isValidOperation){ //if update is not found in updates array we do this
        return res.st atus(400).send({error:'Invalid updates!'}) 
     }
     // else we go forward and update
     try{ 
        const task =  await Task.findById(request.params.id)
        updates.forEach((update)=>{
          task[update] = request.body[update]
        })          
        await task.save()
         if(!task){
             return res.status(404).send()
         }
         res.send(task)
     }catch(e){
         res.status(400).send(e)
     }
 })
 
 
 router.delete('/tasks/:id',async(request,res)=>{
     try{
       const task = await Task.findByIdAndDelete(request.params.id)
       if(!task){
           return res.status(404).send()
       }
       res.send(task)
     }catch(e){
        res.status(500).send() 
     }
 })
 
 
module.exports = router
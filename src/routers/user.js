const express =  require('express')
const User =  require('../models/user')
const router =  new express.Router()


router.post('/users', async(request,res)=>{
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

router.get('/users',async(request,res)=>{
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


router.get('/users/:id',async(request,res)=>{
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


router.patch('/users/:id',async(request,res)=>{  
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


router.delete('/users/:id',async(request,res)=>{
    try{
      const user = await User.findByIdAndDelete(request.params.id)
      if(!user){
          return res.status(404).send()
      }
      res.send(user)
    }catch(e){
       res.status(500).send() 
    }
})


module.exports = router
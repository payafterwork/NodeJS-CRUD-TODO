const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-db',{
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true 
})

const User = mongoose.model('user',{
   name: {
     type: String
   },
   age: {
     type: Number
   }
})


const me = new User({
    name: 'Harshit',
    age: 27
})

me.save().then(
  ()=>{
      console.log(me);
  }).catch((error)=>{
      console.log('Error!', error);
  })
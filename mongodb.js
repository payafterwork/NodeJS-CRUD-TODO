const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017'
const dbname = 'todo'

mongodb.MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
    if(error){
        return console.log("Unable to connect");
    }
    const db = client.db(dbname);
    db.collection('users').insertOne(
        {
            name: 'Harshit',
            age: 20
        }
    )
})
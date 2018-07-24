/*

var user = {Name:'Puplu', Age:27};
var {Name} = user;  //Object destructuring to use values of fields for creating variables
console.log(Name);

*/


//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); // Same as above: Uses destructuring to fit value of 'MongoClient' from mongodb obj to the const MongoClient

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
    if(err)
    {
       return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    /*

    db.collection('Todos').insertOne({
         text: 'New item Jul 23 2018',
         completed:  false
     },(err,result) => {
         if(err){
            return  console.log('Unable to insert Todo',err);
         }

         console.log(JSON.stringify(result.ops, undefined, 2));
     })

     */

     db.collection('Users').insertOne({
         Name:'Mommy',
         Age: 52,
         Location:'KGP, India'
     },(err,result)=> {
         if(err)
         {
             return console.log('Unable to insert User');
         }
         console.log(JSON.stringify(result.ops, undefined, 2)); //result.ops[0]._id.getTimestamp() To see Timestamp attached to ID
     });

    client.close();
});
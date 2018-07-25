/*

var user = {Name:'Puplu', Age:27};
var {Name} = user;  //Object destructuring to use values of fields for creating variables
console.log(Name);

*/


//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); // Same as above: Uses destructuring to fit value of 'MongoClient' from mongodb obj to the const MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
    if(err)
    {
       return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    //delete Many
    db.collection('Users').deleteMany({Name:'Sukanta kr. Dash'}).then((result) => {
        console.log(result);
    });

    // delete One
    // db.collection('Todos').deleteOne({text:'Walk the dog'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5ab71a8ff5bdd9084b603177')}).then((result) => {
        console.log(result);
    });

    //find One & delete

    client.close();
});
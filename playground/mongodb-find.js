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

    // db.collection('Todos').find({
    //     _id: new ObjectID('5aa2febca29105271d77c7fb')
    // }).toArray().then((docs) => {
    //
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });

    db.collection('Users').find({Location:'KGP, India'}).count().then((count) => {
        console.log(`Todos count ${count}`);
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });

    db.collection('Users').find({Age: {$gte: 50}}).count().then((count) => {
        console.log(`Users count ${count}`);
    }, (err) => {
        console.log('Unable to fetch Users list');
    });

    client.close();
});
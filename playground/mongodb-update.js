
//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); // Same as above: Uses destructuring to fit value of 'MongoClient' from mongodb obj to the const MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
    if(err)
    {
       return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ab71a152f6309083a2a18b0')
    },{
        $set:{
               Age:26
             }
    },{
        returnOriginal:false
    }).then((res) => {
        console.log(res);
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ab71a152f6309083a2a18b0') //filter
    },{ //updates
        $set:{
            Name:'Puplu'
        },
        $inc:{Age:1 }
    }, {
        returnOriginal:false //options

    }).then((result) => {
        console.log(result);
    });

    client.close();
});
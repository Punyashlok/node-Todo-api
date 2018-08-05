
const {mongoose} = require('./../server/db/mongoose.js');
const{Todo} = require('./../server/models/todo.js');
const {user} = require('./../server/models/user.js');
const {ObjectID} = require('mongodb');

var id = '5b64d9b735eb3a446087766e';

var userID = '5b5e293e76ea4aed1174cfc6';
// if(!ObjectID.isValid(userID))
// {
//     console.log('ID not VALID');
// }

/* user.find({}).then((users) => {
    console.log(users);
}); */

Todo.find({ // Returns an entire array
    _id: id //new ObjectID('﻿5b64d9b735eb3a446087766e')
   // completed: 'true'
}).then((todos) => {
    console.log('Todos : ', todos);
});

/* Todo.findOne({ //Return 1 document, the first one it finds
    _id:﻿ new ObjectID('5b64d9b735eb3a446087766f')
}).then((todo) => {
    console.log('Todo : ', todo);
}); */

// Todo.findById(id).then((todo) => {
//     if(!todo)
//     {
//        return  console.log('ID not present in DB');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => {console.log(e)});

// user.findById(userID).then((users) => {
//     if(!users)
//     {
//         return console.log('User not present in DB');
//     }
//     console.log('User Email is present ',users);
// }).catch((e) => {
//     console.log(e);
// });

// user.findOne({
//     _id: new ObjectID(﻿'5b64fc19fcd510e02ad12702')
// }).then((users) =>{ console.log('user is :', users)});
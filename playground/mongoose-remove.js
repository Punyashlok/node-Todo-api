const {mongoose} = require('./../server/db/mongoose.js');
const{Todo} = require('./../server/models/todo.js');
const {user} = require('./../server/models/user.js');
const {ObjectID} = require('mongodb');

/* Todo.remove({}).then((results) => {
    console.log(results);
});
 */
//Todo.findOneAndRemove({_id: '﻿5b709ff6fcd510e02ad16aed'}).then((todo) = > {});


Todo.findByIdAndRemove('5b709ff6fcd510e02ad16aed').then((todo) => {
    console.log('Todo Deleted: ',todo);
});


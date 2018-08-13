
const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {user} = require('./models/user.js');
const {ObjectID} = require('mongodb');

/*
var item1 = new Todo({
    text: 'Eat Lunch'
});

item1.save().then((doc) => {
    console.log("Item Saved successfully ",doc);
}, (err) => {
    console.log('Unable to save item',err);
});
 */

var app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {

    var todo = new Todo ({
        text: req.body.text,
        completed:req.body.completed
    });
    console.log(req.body);

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req,res) => {

    Todo.find().then((todos) => {  //FInds all docs inside collection 'Todo'
        res.send({
            todos
            //code: 'asdf' use object formats to send todos array instead of directly sending array.
            // Helps for more flexibility, like tacking on a code etc
        });
    }, (e) => {
            res.status(400).send(e);
    });
});

//GET /todos/1234 i.e. Get a specific todos

app.get('/todos/:id', (req,res) => {

    //res.send(req.params);
    var id = req.params.id;

    if(!ObjectID.isValid(id))
    {
       return res.status(404).send('Invalid ID');
    }

    Todo.findById(id).then((todo) => {
        if(!todo)
        {
            res.status(404).send({message: 'NO such ID present in DB'});
        }

        res.status(200).send({todo}); // {todo, code: 'Success'}

    }).catch((e) => {
        console.log(e);
        res.status(400).send({});
    });
});

app.delete('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id))
    {
        return res.status(404).send('Invalid ID');
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) //Null case
        {
            res.status(404).send({message: 'NO such ID present in DB'});
        }

        res.status(200).send({todo}); // {todo, code: 'Success'}

    }).catch((e) => {
        console.log(e);
        res.status(400).send({});
    });
});

app.patch('/todos/:id',(req, res) => {
    var id = req.params.id;
    var body = lodash.pick(req.body, ['text','completed']);

    if(!ObjectID.isValid(id))
    {
        return res.status(404).send('Invalid ID');
    }

    if(lodash.isBoolean(body.completed) && body.completed) //if completed property is a boolean and true
    {
        body.completedAt = new Date().getTime(); //Setting JS timeStamp
    }else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body}, {new: true}).then((todo) => {

        if(!todo) //Null case
        {
            res.status(404).send({message: 'NO such ID present in DB'});
        }
        res.status(200).send({todo});

    }).catch((e) => {
        res.status(400).send();
    } );
});

app.listen(port, () => {
    console.log(`Started on port: ${port}`);
});

module.exports = {app};
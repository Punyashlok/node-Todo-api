var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {user} = require('./models/user.js');

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



app.listen('4000', () => {
    console.log('Started on port: 4000');
});


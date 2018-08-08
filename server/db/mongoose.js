var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp' || process.env.MONGODB_URI); //'process.env.MONGODB_URI' || mongodb://localhost:27017/TodoApp

module.exports = {mongoose: mongoose};
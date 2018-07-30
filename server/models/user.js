var mongoose = require('mongoose');

var user = mongoose.model('usergrps', {

    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    }
});

module.exports = {user};
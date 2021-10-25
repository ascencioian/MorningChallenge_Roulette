// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');  //bcrypt dependency

// define the schema for our user model
var userSchema = /* this part declares a new schema*/mongoose.Schema({  //To create a Model, you need to create a Schema. A Schema lets you** define the structure of an entry** in the collection. This entry is also called a document.

    local            : {   /* this is where the input values are stored. this defines the structure of an entry with mongoose */
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash  /*this looks like this adds a function to userschema that grabs password and hashes. */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password /*plaintext password*/, bcrypt.genSaltSync(8) /*saltrounds*/, null);  /* bcypt.genSaltSync  generates the salt. 8 refers to salt rounds. (auto-gen a salt and hash) for a syncronous programming language instead of (generate a salt and hash on separate function calls)*/ 
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password); 
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema); //Once we’ve created userSchema, we can use mongoose’s model method to create the model.

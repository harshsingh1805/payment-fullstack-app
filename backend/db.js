const mongoose = require('mongoose');
const { dbURI } = require('./config');

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true  , trim: true  , lowercase: true , minlength: 3, maxlength: 30 },
    password: { type: String, required: true, trim: true  , minlength: 6, maxlength: 100 },
    firstName: { type: String, required: true, trim: true  , minlength: 3, maxlength: 30 },
    lastName: { type: String, required: true, trim: true  , minlength: 3, maxlength: 30 }
});

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, required:true,default: 0 }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
};    
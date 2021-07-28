const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MidtermSchema = new Schema({
    surveyId: String,
    gameGengre: String, //spelling mistake, too late to fix
    daysPerYear: Number,
    age:Number
});

const LoginSchema = new Schema({
    username:String,
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password.length >= 6,
            'Password Should Be Longer'
        ]
    }
});

mongoose.model('Midterm', MidtermSchema);
mongoose.model('Login', LoginSchema);
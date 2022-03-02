// https://mongoosejs.com/docs/guide.html
import mongoose from "mongoose";

const {Schema, model} = mongoose;

// using regex to validate email
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// defining schema 
const userSchema = new Schema(
    // properties
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String, 
            unique: true,
            required: true,
            validate: [ validateEmail, 'Please fill a valid email address']
        },
    }



)
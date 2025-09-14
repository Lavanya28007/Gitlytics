const {Schema, model} = require('../connection');

const userSchema = new Schema({
    name: String,
    lastName: String,
     email:{type: String, unique: true, required: true},
     city:{type:String, default:"Not specified"},
     password:{type:String, required:true},
     createaAt:{type:Date, default:Date.now}
});
module.exports = model('users', userSchema);

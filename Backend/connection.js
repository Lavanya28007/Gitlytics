const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;

//asynchronous function - promise object
mongoose.connect(url)
.then((result) => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
}); 

module.exports = mongoose;

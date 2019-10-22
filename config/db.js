const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://hafizsameed:helloworld@cluster0-0wpce.mongodb.net/bloodApp?retryWrites=true&w=majority";

mongoose.connect(mongoURI);

module.exports = mongoose;
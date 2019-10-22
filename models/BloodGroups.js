const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BloodGroupSchema = new Schema({
    value:String
})

const BloodGroup = mongoose.model('BloodGroup', BloodGroupSchema);

module.exports = BloodGroup;
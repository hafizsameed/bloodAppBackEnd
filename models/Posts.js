const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    firstName: String,
    lastName:String,
    userId:String,
    bloodGroup:String,
    units:Number,
    urgency:String,
    country:String,
    state:String,
    city:String,
    hospital:String,
    relation:String,
    contact:String,
    detail:String,
    volunteer:[
        {
            id:String,
            firstName:String,
            lastName:String,
            bloodGroup:String,
            status:String
        }
    
    ],
    comments:[
        {
            senderId:String,
            firstName:String,
            lastName:String,
            message:String
        }
    ]
})



const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;
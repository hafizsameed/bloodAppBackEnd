const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');
const verifyToken = require('../middlewares/verifyToken');


router.get('/getAllPosts',verifyToken,(req, res) => {
    const Posts= Post.find();
    Posts.then((data)=>{
        res.send({result:data})
    })
    .catch((e)=>{
        res.send({result:e.message})
    })
})


router.post('/getPost',verifyToken,(req,res)=>{
    const id =req.body.id
    Post.find({_id:id})
    .then((data)=>{
        res.send({result:data});
    })
    .catch((e)=>{
        res.send({message:e.message})
    })
})


router.post('/addPost', verifyToken, (req, res) => {
 const postData=req.body;
 const newPost=new Post(postData);

    newPost.save().then(() => {
        res.send({result: "Post added successfully"})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/updatePost',verifyToken,(req,res)=>{
    const id =req.body.id
    const  volunteer = req.body.volunteer;
    console.log(volunteer,"volunteer")
    Post.update({_id:id},{$push:{volunteer}})
    .then(()=>{
        res.send({message:"user updated"});
    })
    .catch((e)=>{
        res.send({message:e.message})
    })
})

router.post('/addComment',verifyToken,(req,res)=>{
    const id = req.body.id
    const  comment = req.body.comment;
    Post.update({_id:id},{$push:{comments:comment}})
    .then(()=>{
        res.send({message:"comment sent"});
    })
    .catch((e)=>{
        res.send({message:e.message})
    })
})




module.exports = router;
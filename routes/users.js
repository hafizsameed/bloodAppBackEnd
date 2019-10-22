const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const verifyToken = require('../middlewares/verifyToken');

//protected route
router.get('/getAll', verifyToken, (req, res) => {
    const users = Users.find();

    users.then((allUsers) => {
        res.send({result: allUsers})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/register', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo,"userInfo")
    const user = new Users(userInfo);

    user.save().then(() => {
        res.send({result: "Registered Successfully!"})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/login', async (req, res) => {
    const userInfo = req.body;

    //check email
    const user = await Users.findOne({email: userInfo.email});

    if(!user) {
        res.send({message: "Invalid email or password!"});
    }

    //check password
    const matchPassword = user.comparePassword(userInfo.password);

    if(!matchPassword) {
        res.send({message: "Invalid email or password!"});
    }

    //generate token
    await user.generateToken();

    res.send({_id: user._id, email: user.email, token: user.token});


    // user.then((userObj) => {
        
    //     console.log('allUsers =-==>', allUsers)
    //     // res.send({result: "Registered Successfully!"})
    // }).catch(e => {
    //     res.send({message: e.message});
    // })
})


//fetch('url.com/users/314y781yieash')
router.post('/getUser', (req, res) => {
    //req.params.id
    const email = req.body.email;
    const users = Users.find({ email });

    users.then((allUsers) => {
        res.send({result: allUsers})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/addUser', (req, res) => {
    const user = req.body;
    const newUser = new Users(user);

    newUser.save()
    .then(() => {
        res.send({message: "User added successfully!"})
    })
    .catch(e => {
        console.log('e ===>', e);
        res.send({message: e.message})
    })
})

module.exports = router;
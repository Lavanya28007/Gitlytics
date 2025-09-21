const express = require('express');
const Model = require('../models/UserModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/register',(req, res) => {
    console.log(req.body);
    new Model(req.body).save()
    .then((result) =>{
        res.status(200).json(result);
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);    
    });   
});

//getall
router.get('/getall' ,(req, res) => {
    Model.find()
    .then((result) =>{
        res.status(200).json(result);
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);    
    });
});
//url params
router.get('/getbycity/:city', (req, res)=>{
    Model.find({city:req.params.city}) 
    .then((result) =>{
        res.status(200).json(result);
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);    
    });
});
router.get('/getbyemail/:email', (req, res) =>{
 Model.findOne({email: req.params.email}) // email is field in UserModel
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});  

//getbyid
router.get('/getbyid/:id', (req, res) =>{
  // Model.findOne({_id: req.params.id})
 Model.findById(req.params.id)    // id is field in UserModel
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});    

router.delete('/delete/:id', (req, res) => {
     Model.findByIdAndDelete(req.params.id)   
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/update/:id', (req, res) => {
     Model.findByIdAndUpdate(req.params.id, req.body, { new: true })   
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

                                                                                                           
router.post('/authenticate',(req, res) => {
    const {email, password} = req.body;
    Model.findOne({email, password})
    .then((result) => {

        if(result){
            // create token
            const {_id, name} = result;

            jwt.sign(
              {_id, name},
              process.env.JWT_SECRET,
              {expiresIn:'1h'},
              (err, token) =>{
                if (err){
                    console.log(err);
                    res.status(500).json(err);
                }else{
                    res.status(200).json({token, _id, name});
                }
                
              }
            )

        }else{
            res.status(401).json({message: 'Invalid credentials'});
        }

    }).catch((err) =>{
        console.log(err);
        req.status(500).json(err);
        
    });
})

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var fetchuser = require('../middleware/fetchuser');
//create a new user using :post No login required
const JWT_SECRET='harryisagood'

router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must of 5 char').isLength({ min: 5 }),
], async (req, res) => { 
        let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //check whether this email already exists
    try {
        
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success,error:"Sorry user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,

    });
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken= jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken}); 
    // res.json(user);

} catch (error) {
     console.error(error.message);   
     res.status(500).send("Some error occured");
}
// .then(user=> res.json(user));
      
});

router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req, res) => { 
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}= req.body;
    try {
        let user= await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({error:"Invalid credentials"});
        }
        const passwordCompare= await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                success=false;
                return  res.status(400).json({success,error:"Invalid credentials"});
            }
        
            const data={
                user:{
                    id:user.id
                }
            }
            const authtoken= jwt.sign(data,JWT_SECRET);
            success=true;
            res.json({success,authtoken}) 


    } catch (error) {
        console.error(error.message);   
        res.status(500).send("Internal server error occured");
    }

});

//ROUTE 3: Get logged in user details

router.post('/getuser',fetchuser, async (req, res) => { 

    try {
       const userId=req.user.id;
        const user= await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

})


module.exports = router;

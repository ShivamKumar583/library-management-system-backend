const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// function for signup
exports.register = async (req, res) => {
    try{
        const { name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "Please provide all the data for registration"
        })
    }

    const user = await new User({
        name,email,password
    }).save();

    console.log("User registration completed");
    res.status(201).json({
        message:"User registration completed",
        user
    });
    }
    catch(err){
        console.log(err);
    }
    
};

// function for login
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                message: "Please provide all the data for login"
            })
        }

    let user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({ 
            message: 'Invalid credentials' 
        });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '10h' });
    user = {
        name : user.name,
        email : user.email,
        isAdmin:user.isAdmin,
        id:user._id
    }
    console.log("Login successfully")
    res.json({
        message:"Login successfully",
        token ,
        user
    });
    }
    catch(err){
        console.log(err);
    }
    
};

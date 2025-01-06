const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

    res.status(201).json({
        message:"User registration completed",
        user
    });
    }
    catch(err){
        console.log(err);
    }
    
};

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                message: "Please provide all the data for login"
            })
        }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({ 
            message: 'Invalid credentials' 
        });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '10h' });
    res.json({
        message:"Login successfully",
        token 
    });
    }
    catch(err){
        console.log(err);
    }
    
};

const express = require('express');
const cors = require('cors');
const database = require('./config/database');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const {cloudinaryConnect} = require('./config/cloudinary');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_ENDPOINT,
    methods:['GET' , 'POST','DELETE' , 'PUT'],
    credentials: true,
}));
app.use(cookieParser);
app.use(express.json());

// File-uppload to cloudinary
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp',
    })
)

// MongoDB connection
database.connect();

// connect to cloudinary
cloudinaryConnect();

// Routes
app.use('/api/v1/books', require(''));
app.use('/api/v1/users', require(''));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
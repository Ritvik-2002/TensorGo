const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc register user
//@route POST /user/register
//@access Public

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user) {
        res.status(200).json({ _id: user.id, email: user.email });
      } else {
        res.status(400);
        throw new Error("User data is not valid");
      }
    res.json({ message: "Register the user" });
});

//@desc login user
//@route POST /toddle/user/login
//@access Public
const loginuser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }
    const user = await User.findOne({
        email
    });
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
        {
            user: {
            username: user.username,
            email: user.email,
            id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "1d" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//@desc get by id
//@route GET /toddle/users/getall
//@access all

const getAllUsers = asyncHandler(async(req, res) => {
    res.send("Get all users");
});

module.exports = {registerUser, loginuser, getAllUsers};


const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");
const { json } = require("express");


const registerUser =  asyncHandler(async(req , res) =>{
    const {name, email , password , pic} = req.body;

    if(!name || !email || !password){
        res.status(404);
        throw new Error("please Enter all the fields");
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User is already Exists");
    }

    const user = await User.create({
        name , email , password ,pic ,

    });

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            pic : user.pic ,
            token : generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("failed to Create the User");
    }
});

const authUser = asyncHandler(async (req , res) => {
    const {email , password} = req.body;
    const user = await User.findOne({email});

    if(user || (await user.matchPassword() )){
        res.json({
         _id : user._id ,
        name : user.name,
        email : user.email,
        pic : user.pic ,
        token : generateToken(user._id),   
        });
    }
})

const allUser = asyncHandler(async(req , res) =>{
    const keyword = req.query.search ? {
        $or : [
            {name : {$regex : req.query.search, $options : "i"}},
            {email : {$regex : req.query.search, $options : "i"}},

        ]


    }
    : {};

    const users = await User.find(keyword)
    // .find({_id : {$ne : req.user._id }}); 
    res.send(users);
});

module.exports = {registerUser , authUser, allUser};
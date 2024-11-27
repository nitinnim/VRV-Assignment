const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");

// auth middleware
exports.auth = async(req, res, next) => {
    try{
        // fetch token
        // console.log("Inside middleware");
        const token = req.header("Authorization").replace("Bearer ", "");
        // console.log(token);
        // if token missing
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }
        // console.log(req, '-req');
        // verify token
        try{ 
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log("Decoded token -> " + decode);
            req.user = decode;
        }
        catch(err){
            console.log("Error in token decoding")
            return res.status(403).json({
                status: false,
                token,
                message: "Token is Invalid",
            })
        }
        next();

    }
    catch(err){
        console.log("Inside error")
        console.log("Error in auth middleware: " + err.message);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while validating the token",
        })
    }

}
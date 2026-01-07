import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({success:false, message:'Missing Details'})
    }

    try{
        const existingUser = await userModel.findOne({username});
        if(existingUser){
            return res.status(404).json({success:false, message:'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({username, password: hashedPassword});

        await user.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        })

        return res.json({success:true, message:'Register Successfully', token, username: user.username});

    }catch(err){
        return res.status(500).json({success:false, message:err.message})
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({success:false, message:'Username and  password are required'})
    }

    try{
        const user = await userModel.findOne({username});

        if(!user){
            return res.status(422).json({success:false, message:'Invalid Username'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(422).json({success:false, message:'Invalid password'})
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        })

        return res.json({success:true, message:'Login Successfully', token, username: user.username});

    }catch(error){
        return res.status(500).json({success:false, message:error.message});
    }
}

export const logout = async (req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        })

        return res.status(200).json({success: true, message: "Logged Out"});
    }catch(err){
        return res.status(500).json({ success: false, message: err.message})
    }
}

// check if user is authenticated 
export const isAuthenticated = async (req, res) => {
    try{
        return res.json({success: true});
    }catch(error){
        res.json({success: false, message: error.message});
    }
}

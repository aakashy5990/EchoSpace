import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try{
        const {userId} = req.body;

        const user = await userModel.findById(userId)

        if(!user){
            return res.json({success: false, message: 'User not Found'})
        }

        res.json({success:true, userData: user.username})

    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}
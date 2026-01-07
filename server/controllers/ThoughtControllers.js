import Thought from "../models/Thoughts.js";

export const addThought = async (req, res) => {
    try{
        const {mood, thought} = req.body;

        if(!mood || !thought){
            return res.status(400).json({success:false, message:'Missing required fields'})
        }

        await Thought.create({mood, thought});

        res.status(201).json({success:true, message:'Thought Added Successfully'})

    }catch(error){
        console.error('addThought error:', error);
        res.status(500).json({success:false, message: 'Internal server error'})
    }
}

export const getThought = async (req, res) => {
    try{
        const thoughts = await Thought.find().sort({createdAt: -1})
        res.status(200).json({success:true, thoughts})
    }catch(error){
        console.error('getThought error:', error);
        res.status(500).json({success:false, message: 'Internal server error'})
    }
}
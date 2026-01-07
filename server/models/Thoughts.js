import mongoose from "mongoose";

const thoughtSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true
    },
    thought: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps:true });

const Thought = mongoose.model('thought',thoughtSchema);

export default Thought;
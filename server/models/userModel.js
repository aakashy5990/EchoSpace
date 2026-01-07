import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
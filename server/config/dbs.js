import mongoose from "mongoose";
import 'dotenv/config'


const connectDB = async () => {
    try{
        if(!process.env.Mongo_URL){
            throw new Error('Mongo_URL environment variable is not defined. Please check your .env file.');
        }

        // connection event lisners 
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB Connected Successfully');
        })

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB Disconnected');
        })

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB Connection Error:', err);
        })

        await mongoose.connect(`${process.env.Mongo_URL}`)

    }catch(error){
        console.error('❌ Database Connection Failed:', error.message);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;
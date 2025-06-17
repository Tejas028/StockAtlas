import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("\nMongoDB Connected");
    } catch (error) {
        console.error("MONGODB Connection Failed: ", error);
        process.exit(1);
    }
}

export default connectDB;
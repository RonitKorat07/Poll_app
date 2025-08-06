import mongoose from "mongoose";

const connection = async (req,res) => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`Mongodb connection with ${conn.connection.name}`);
    } catch (error) {
        console.log('Mongodb not connect' , error);
    }
}

export default connection;
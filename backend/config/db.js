import mongoose from "mongoose";

const connectDb = async () => {
  const conn = await mongoose.connect( process.env.MONGO_URL );

  console.log(`MongoDb Connected : ${conn.connection.host}`);
};

export default connectDb;

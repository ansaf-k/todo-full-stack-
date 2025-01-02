import mongoose from "mongoose";

const connectDb = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://todo:todo123@cluster0.hoyu0.mongodb.net/"
  );

  console.log(`MongoDb Connected : ${conn.connection.host}`);
};

export default connectDb;

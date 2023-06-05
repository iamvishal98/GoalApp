import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB CONNECTED : ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB CONNECTION ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;

import mongoose from "mongoose";

const database_connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default database_connection;
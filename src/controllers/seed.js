import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userSchema.js"; 
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminExists = await User.findOne({ email: "admin@first.com" });
    if (adminExists) {
      console.log("Admin already exists!");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "first Admin",
      email: "admin@first.com",
      password: hashedPassword,
      role: "admin",
      status: "active"
    });

    console.log(" First Admin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
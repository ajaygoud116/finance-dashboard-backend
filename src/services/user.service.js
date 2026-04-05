import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const createUser = async (user, data) => {
  if (user.role !== "admin") {
    throw new Error("Only admin can create users");
  }
  const { email, password, name, role } = data;
  if (!email) throw new Error("Email required");
  if (!password) throw new Error("Password required");

  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newuser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "viewer",
  });

  return await newuser.save();
};

export const getUsers= async (user) => {

  if (user.role !== "admin") {
    throw new Error("Only admin can view users");
  }
  return await User.find({}, "-password");
};

export const updateUser = async (user, id, data) => {
  if (user.role !== "admin") {
    throw new Error("Only admin can update users");
  }
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  if (!updatedUser) throw new Error("User not found");
  return updatedUser;
};

export const deleteUser = async (user, id) => {
  if (user.role !== "admin") {
    throw new Error("Only admin can delete users");
  }
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw new Error("User not found");
  return { message: "User deleted successfully" };
};
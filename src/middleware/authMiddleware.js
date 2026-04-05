import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema.js"; 

dotenv.config();

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach minimal user info
    req.user = {
      _id: decoded.id,
      role: decoded.role,
    };

    // Check if user still exists / active
    const user = await User.findById(decoded.id);
    if (!user || user.status !== "active") {
      return res.status(403).json({ message: "User not authorized" });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
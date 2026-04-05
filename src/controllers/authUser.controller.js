import User from "../models/userSchema.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      //Inactivity Check - prevents login if account is inactive
      if (user.status === "inactive") {
        return res.status(403).json({ message: "Account is inactive. Please contact Admin." });
      }

      res.status(200).json({

        message: "Login successful",
        token: generateToken(user._id, user.role),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      });
      
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
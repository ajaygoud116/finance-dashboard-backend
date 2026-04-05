import express from "express";
import userRoutes from "./routes/userRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import rateLimit from "express-rate-limit";

const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP adress, please try again after 15 minutes"
});

app.use(express.json());
app.use("/api/v1/", apiLimiter);


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/records", recordRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use((err, req, res, next) => {
  res.status(err.status ||400).json({
    message: err.message || "Something went wrong",
  });
});

export default app;
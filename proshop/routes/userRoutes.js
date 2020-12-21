import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @Route   Auth user & get token
// @Desc    POST /api/users/login
// @Access  Public
router.post("/login", expressAsyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  }

  res.status(401);
  throw new Error("Invalid email or password");
}));

// @Route   Get user's profile
// @Desc    GET /api/users/profile
// @Access  Private
router.get("/profile", protect, expressAsyncHandler(async (req, res) => {
  res.send("Success");
}));


export default router;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Unauthorized" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ token });
});

module.exports = router;

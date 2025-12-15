const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Create admin automatically
async function createAdmin() {
  const user = await User.findOne({ email: process.env.ADMIN_EMAIL });

  if (!user) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword
    });

    console.log("Admin created");
  }
}

createAdmin();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/status", require("./routes/status.routes"));

app.listen(5000, () =>
  console.log("Server running on port 5000")
);

const express = require("express");
const Status = require("../models/Status");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

// Update status (ADMIN)
router.post("/", auth, async (req, res) => {
  const { currentStatus } = req.body;

  let status = await Status.findOne();

  if (!status) {
    status = new Status({ currentStatus });
  } else {
    status.currentStatus = currentStatus;
    status.updatedAt = Date.now();
  }

  await status.save();
  res.json(status);
});

// Public status
router.get("/", async (req, res) => {
  const status = await Status.findOne();
  res.json(status);
});

module.exports = router;

const express = require("express");
const router = express.Router();

// @Route   Get api/users
// @Desc    Test Route
// @Access  Public
router.get("/", (req, res) =>
  res.send("User Routes")
);

module.exports = router;
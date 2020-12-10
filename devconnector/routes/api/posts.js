const express = require("express");
const router = express.Router();

// @Route   Get api/posts
// @Desc    Test Route
// @Access  Public
router.get("/", (req, res) =>
  res.send("Posts Routes")
);

module.exports = router;
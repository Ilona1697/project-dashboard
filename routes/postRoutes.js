const express = require("express");
const router = express.Router();
// Import controller methods
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
} = require("../controllers/PostController");

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);
router.post("/getPostById", getPostById);
router.delete("/deletePost/:id", deletePost);
router.put("/updatePost", updatePost);

module.exports = router;
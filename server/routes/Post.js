import express from "express";

import { createPost, getPost, deletePost } from "../controllers/Post.js";

const router = express.Router();

router.get("/", getPost);
router.post("/new", createPost);
router.delete("/delete/:id", deletePost);

export default router;

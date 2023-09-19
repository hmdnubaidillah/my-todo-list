import Post from "../models/Post.js";

// read post
export async function getPost(req, res) {
  try {
    const post = await Post.find();

    return res.status(200).json({ post, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Cant fetch post" });
  }
}

// create post
export async function createPost(req, res) {
  const { todo, inProgress, isDone, createdAt } = req.body;

  try {
    const newPost = await Post.create({ todo, inProgress, isDone, createdAt });

    return res.status(200).json({ post: newPost, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Cant create post" });
  }
}

// delete post
export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findOneAndDelete({ id });
    console.log(id, post);
    return res.status(200).json({ success: true, deletedPost: post });
  } catch (error) {
    return res.status(500).json({ message: "Cant delete todo" });
  }
}

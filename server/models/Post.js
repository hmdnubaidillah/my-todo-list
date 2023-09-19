import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  todo: {
    type: String,
    required: true,
  },

  inProgres: {
    type: Boolean,
    default: true,
  },

  isDone: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: String,
  },
});

const Post = model("Post", PostSchema);

export default Post;

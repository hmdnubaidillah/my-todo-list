import User from "../models/User.js";

import jwt from "jsonwebtoken";

export default function userVerification(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, "secret", async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data._id);

      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
}

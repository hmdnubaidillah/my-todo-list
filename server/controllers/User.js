import User from "../models/User.js";
import bcrypt from "bcrypt";
import createSecretToken from "../utils/token.js";

const maxAge = 3 * 24 * 60 * 60;

// login
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Username not found" });
    } else {
      const auth = await bcrypt.compare(password, user.password);

      if (!auth) {
        return res.status(401).json({ message: "Password incorrect" });
      } else {
        const token = createSecretToken(user._id);

        res.cookie("jwt", token, {
          withCredentials: true,
          maxAge: maxAge * 1000,
        });

        return res
          .status(201)
          .json({ message: "User logged in successfully", success: true, user });
      }
    }
  } catch (error) {
    // Handle other errors or log them
    console.error(error);
    return res.status(500).json({ message: "User can't login" });
  }
}

// create account
export async function signUp(req, res) {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ message: "Username already registered" });
    }

    // encrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hashedPassword });

    const token = createSecretToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User cant sign in", success: false });
  }
}

export async function logout(req, res) {
  res.cookie("jwt", "secret", { maxAge: 1 });
}

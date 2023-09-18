import epxress from "express";
import { signUp, login, logout } from "../controllers/User.js";
import userVerification from "../middlewares/auth.js";

const router = epxress.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/", userVerification);
router.get("/logout", logout);

export default router;

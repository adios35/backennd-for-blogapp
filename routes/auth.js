import Express from "express";
import { createUser, loginUser, userLogOut } from "../controller/auth.js";
import { verifyToken } from "../middleware/verifiyToken.js";
const router = Express();

router.delete("/logout", verifyToken, userLogOut);
router.post("/register", createUser);
router.post("/login", loginUser);

export default router;

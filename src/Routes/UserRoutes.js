import express from "express";
import { registerUser, loginUser, logoutUser, updateUser, checkAdmin } from "../Controllers/UserController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update", updateUser);
router.post("/check-admin", checkAdmin);

export default router;
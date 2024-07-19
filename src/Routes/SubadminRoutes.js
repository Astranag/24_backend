import express from "express";
import { registerSubadmin, loginSubadmin, logoutSubadmin, updateSubadmin, checkSubadmin, getSubadminDetails } from "../Controllers/SubadminController.js";

const router = express.Router();

router.post("/register", registerSubadmin);
router.post("/login", loginSubadmin);
router.post("/logout", logoutSubadmin);
router.put("/update", updateSubadmin);
router.post("/check-subadmin", checkSubadmin);
router.get("/:posterId", getSubadminDetails);

export default router;
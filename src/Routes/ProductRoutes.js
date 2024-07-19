// src/Routes/ProductRoutes.js
import express from "express";
import {
  addNewProduct,
  getAllProducts,
  getAllApprovedProducts,
  getProductsByUserId,
  getAllPendingProducts,
  getProductsHistory,
  getProductsByCategory, 
  updateProductById,
  updateProductStatus,
  updateSubadminEmail,
  getSoldProducts,
  confirmProductPayment,
  declineProductPayment,
  deleteProductsHistory,
  getProductsBySubadminEmail,
  getProductsBySubadminAndStatus
} from "../Controllers/ProductController.js";

const router = express.Router();

router.post("/add", addNewProduct);
router.get("/all", getAllProducts);
router.get("/user/:posterId", getProductsByUserId);
router.get("/approveds", getAllApprovedProducts);
router.get("/pendings", getAllPendingProducts);
router.get("/history", getProductsHistory);
router.post("/history/:id", deleteProductsHistory);
router.get("/category/:category", getProductsByCategory); 
router.get("/sold", getSoldProducts);
router.put("/update/:id", updateProductById);
router.put("/status", updateProductStatus);
router.put("/update-subadmin-email", updateSubadminEmail);
router.put("/confirm/payment", confirmProductPayment);
router.put("/decline/payment", declineProductPayment);
router.get("/by-subadmin", getProductsBySubadminEmail);
router.get("/by-subadmin-status", getProductsBySubadminAndStatus);


export default router;
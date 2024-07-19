import express from "express";
import { createNewOrder, getAllOrders, getCustomerOrders, confirmOrder, deleteOrder } from "../Controllers/OrderController.js";
import { IsAuthUser } from "../Utils/IsAuthUser.js";
const router = express.Router();

router.post("/create", createNewOrder);
router.get("/customer/:customerId", getCustomerOrders);
router.get("/all", getAllOrders);
router.put('/confirm/:orderId', confirmOrder);
router.delete('/delete/:orderId', deleteOrder);

export default router;
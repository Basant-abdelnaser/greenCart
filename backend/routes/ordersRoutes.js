import express from "express";
import {
  getAllOrders,
  getOrdersById,
  placeOrderCOD,
} from "../controllers/orderController.js";
import authSeller from "../middlewares/authSeller.js";
import authUser from "../middlewares/authUser.js";

const orderRouter = express.Router();
orderRouter.get("/", authSeller, getAllOrders);
orderRouter.get("/:id", authUser, getOrdersById);
orderRouter.post("/cod", authUser, placeOrderCOD);

export default orderRouter;

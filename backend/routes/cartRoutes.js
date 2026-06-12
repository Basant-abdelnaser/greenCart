import express from "express";
import { updateCart } from "../controllers/cartController.js";
import authUser from "../middlewares/authUser.js";

const cartRouter = express.Router();

cartRouter.put("/update", authUser, updateCart);

export default cartRouter;

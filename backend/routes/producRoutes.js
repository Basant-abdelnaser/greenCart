import express from "express";
import {
  addProduct,
  changeProductStock,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("image"), authSeller, addProduct);
productRouter.get("/list", getAllProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.put("/stock/:id", authSeller, changeProductStock);

export default productRouter;

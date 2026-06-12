import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config";
import sellerRouter from "./routes/sellerRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/producRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/ordersRoutes.js";

const port = process.env.PORT || 4000;
// allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

await connectDB();
await connectCloudinary();

// middleware configration
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

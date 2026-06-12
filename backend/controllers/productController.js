import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
// add product : /api/products/add
export const addProduct = async (req, res) => {
  try {
    const productData = req.body;

    const images = req.files;

    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });

        return result.secure_url;
      }),
    );

    await Product.create({
      ...productData,
      image: imagesUrl,
    });

    return res.status(201).json({
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get all products : /api/products/list
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// get single product : /api/products/:id
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// change product in stock : /api/products/stock/:id
export const changeProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;
    console.log("inStock", inStock);
    console.log("id", id);
    const product = await Product.findByIdAndUpdate(id, {
      inStock,
    });
    return res
      .status(200)
      .json({ message: "Stock updated successfully", product });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

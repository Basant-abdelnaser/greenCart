import Order from "../models/Order.js";
import Product from "../models/Product.js";

// place order COD :api/orders/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!items || items.length === 0 || !address) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    let amount = 0;

    // تحسين الأداء: fetch all products in one query
    const productIds = items.map((item) => item.product);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== items.length) {
      return res.status(404).json({
        message: "One or more products not found",
      });
    }

    // calculate total
    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product}`,
        });
      }

      amount += product.offerPrice * item.quantity;
    }

    // add tax (2%)
    amount = Math.floor(amount + amount * 0.02);

    const order = await Order.create({
      userId: req.userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// get orders by userId :api/orders/:id
export const getOrdersById = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.id,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// get all orders :api/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("items.product")
      .populate("address");
    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

import User from "../models/User.js";

// update cart : /api/cart/update

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    await User.findByIdAndUpdate(req.userId, {
      cartItems,
    });

    const user = await User.findById(req.userId).select("-password");
    return res.status(200).json({
      message: "Cart updated successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

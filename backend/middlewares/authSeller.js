import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (decoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export default authSeller;


import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.userId= decoded.id;
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};


export default authUser;

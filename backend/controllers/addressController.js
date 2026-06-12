// add address : api/address/add

import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const address = await Address.create({ ...req.body, userId });
    return res
      .status(201)
      .json({ message: "Address added successfully", address });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// get address : api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addresses = await Address.find({ userId });
    return res.status(200).json({ addresses });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

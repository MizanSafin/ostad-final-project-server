const ProductModel = require("../models/ProductsModel");

exports.createProduct = async (req, res) => {
  try {
    let reqBody = req.body;
    let product = await ProductModel.create(reqBody);
    res.status(200).json({
      success: true,
      product,
      message: "product is added to database.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    return res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "cann,t get products.",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;

    await ProductModel.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: " Product is deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in delting Product",
      error,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    let { id } = req.params;

    let product = await ProductModel.findOne({ _id: id });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "cann,t get product.",
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let reqBody = req.body;
    await ProductModel.updateOne({ _id: id }, reqBody);
    res.status(200).json({
      success: true,
      message: " Product is updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updating Product",
      error,
    });
  }
};

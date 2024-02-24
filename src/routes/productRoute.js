const express = require("express");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
} = require("../controllers/productsController");

const productRouter = express.Router();

productRouter.post("/create", AuthVerifyMiddleware, createProduct);
productRouter.get("/all-product", AuthVerifyMiddleware, getAllProducts);
productRouter.get("/delete-product/:id", AuthVerifyMiddleware, deleteProduct);
productRouter.get("/productByID/:id", AuthVerifyMiddleware, getSingleProduct);
productRouter.post("/update-product/:id", AuthVerifyMiddleware, updateProduct);

module.exports = productRouter;

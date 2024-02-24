const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg",
    },
  },
  { versionKey: false, timestamps: true }
);

let ProductModel = mongoose.model("products", productsSchema);
module.exports = ProductModel;

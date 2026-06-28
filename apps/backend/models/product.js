import { model, Schema } from "mongoose";
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], default: [] },
    category: { type: String, required: true }
}, { timestamps: true });
const Product = model("Product", productSchema);
export default Product;

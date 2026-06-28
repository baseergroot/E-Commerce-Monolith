import { model, Schema } from "mongoose";
const orderSchema = new Schema({
    user: {
        email: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    items: {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    total: { type: Number, required: true },
    status: { type: String, required: true }
}, { timestamps: true });
const Order = model("Order", orderSchema);
export default Order;

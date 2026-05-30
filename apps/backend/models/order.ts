import { Document, model, Schema } from "mongoose";



interface OrderDocument extends Document{
    user: {
      email: string
      name: string
      phone: string
    };
    items: {
      productId: string
      name: string
      quantity: number
      price: number
    }[];
    total: number;
    status: "pending" | "processing" | "shipped" | "out for delivery" | "completed" | "cancelled";
}

const orderSchema = new Schema<OrderDocument>({
    user: {
        email: {type: String, required: true},
        name: {type: String, required: true},
        phone: {type: String, required: true}
    },
    items: {
        productId: {type: String, required: true},
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}
    },
    total: {type: Number, required: true},
    status: {type: String, required: true}
}, {timestamps: true});

const Order = model<OrderDocument>("Order", orderSchema);

export default Order;

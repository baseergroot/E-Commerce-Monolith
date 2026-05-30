import { Document, model, Schema } from "mongoose";



interface ProductDocument extends Document{
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: string;
}

const productSchema = new Schema<ProductDocument>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    images: {type: [String], default: []},
    category: {type: String, required: true}
}, {timestamps: true});

const Product = model<ProductDocument>("Product", productSchema);

export default Product;

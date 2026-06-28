import { model, Schema } from "mongoose";
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });
const User = model("User", userSchema);
export default User;

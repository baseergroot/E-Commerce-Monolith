import { Document, model, Schema } from "mongoose";



interface UserDocument extends Document{
    email: string;
    password: string;
    role: string;
}

const userSchema = new Schema<UserDocument>({
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["admin", "user"], default: "user"}
}, {timestamps: true});

const User = model<UserDocument>("User", userSchema);

export default User;

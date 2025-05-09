import mongoose, {model, Schema} from "mongoose";
import dotenv from "dotenv";
dotenv.config()

mongoose.connect(process.env.MONGO_URL as string);  

const userSchema= new Schema({
    username: {type: String, unique: true},
    // email: {type: String, unique: true},
    password: {type: String}
})

const contentSchema= new Schema({
    title: String,
    link: String,
    type: String,
    tag: [{ type: String }],
    userid: {type: mongoose.Types.ObjectId, ref:'User', required: true}
})

const linkSchema= new Schema({
    hash: String,
    userid: {type: mongoose.Types.ObjectId, ref:'User', required: true, unique: true}
})

export const linkModel= model("Links", linkSchema);
export const contentModel= model('Content', contentSchema);
export const userModel= model("User", userSchema);
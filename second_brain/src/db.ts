import mongoose,{ model, Document, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

mongoose.connect(process.env.DATABASE_URL);

const UserSchema= new Schema({
    username: {type: String , unique: true},
    password: {type: String}
})
export const UserModel= model("User" , UserSchema)

export interface UserType extends Document {
  username: string;
  password: string;

}// interface for existing user

const ContentSchema =new Schema({
    title: String,
    link: String,
    type: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId , ref: 'User' , required: true}
})
export const ContentModel = model("Content" , ContentSchema)

const LinkSchema= new Schema({
  hash: String,
  userId: {type: mongoose.Types.ObjectId , ref: 'User' , required: true , unique: true}
})
export const LinkModel = model("Links" , LinkSchema)
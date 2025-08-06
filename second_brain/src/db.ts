import mongoose,{ model, Document, Schema } from "mongoose";

mongoose.connect("mongodb+srv://thisiskirti28:hCzJtiRlwnV8S1E8@cluster0.foytnsp.mongodb.net/second-brain")

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
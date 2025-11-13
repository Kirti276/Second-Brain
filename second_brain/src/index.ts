import express from "express";
import { connectDB } from "./db";
import mongoose, { Types } from "mongoose";
import jwt from "jsonwebtoken";
import {z} from "zod" ;
import bcrypt from "bcrypt" ;
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { UserType } from "./db";
import { random } from "./utils";
import cors from "cors";
import aiChatRouter from "./aichat";


const app= express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/ai", aiChatRouter);



connectDB();
app.post("/api/v1/signup" , async (req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    //zod validation 
    const requiredbody= z.object({
        username: z.string().min(2).max(100),
        password: z.string().min(3).max(30)
    })

    const parsedbody= requiredbody.safeParse(req.body);
    if(!parsedbody.success){
        res.json({
            message: "Incorrect format",
            error: parsedbody.error
        })
        return
    }

    //  hash the password
    const hashedpassword= await bcrypt.hash(password,5)
    
    try{
       await UserModel.create({
            username: username,
            password: hashedpassword
        })

        res.json({
            message: "Sign up successful"
        })
    } catch(e){
        res.status(409).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin" , async (req,res)=>{
   const username= req.body.username;
   const password= req.body.password;

   const existingUser= await UserModel.findOne({
    username
   }) as UserType

   if(!existingUser){
    res.status(403).json({
        message:"User does not exist"
    })
    return
   }

   const passwordMatch= await bcrypt.compare(password, existingUser.password)
   
   if(passwordMatch){
    const token= jwt.sign({
      id: existingUser._id
    }, JWT_SECRET)

    res.json({
        token
    })
   }else{
    res.status(403).json({
        message: "Incorrect credentials"
    })
   }

})


app.post("/api/v1/content" , userMiddleware, async (req,res)=>{
    const link= req.body.link;
    const title= req.body.title;
    const type= req.body.type;

     await ContentModel.create({
        
        title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

     res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content" , userMiddleware, async (req,res)=>{
    //@ts-ignore 
    const userId= req.userId
    const content= await ContentModel.find({
        userId:userId
    }).populate("userId" , "username") // this gives all the content of the user with the userid if u want only username then u can mention it to get it
    res.json({
        content
    })
})

app.delete("/api/v1/content" , userMiddleware, async (req,res)=>{
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message:"Deleted"
    })

})

app.post("/api/v1/brain/share", userMiddleware, async (req,res)=>{
    const share= req.body.share;
    if(share){
        // first check whether the link already exits or not
        const existingLink = await LinkModel.findOne({
             //@ts-ignore
            userId: req.userId
        })
        if(existingLink){
            res.json({
                hash: existingLink.hash
        })
        return
        }
        const hash=random(10);
       await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash: hash
        })
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
    }

    res.json({
        message: "Removed link"
    })

})

app.get("/api/v1/brain/:shareLink", async (req,res)=>{
    const hash = req.params.shareLink

    const link = await LinkModel.findOne({
        hash
    })

    if(!link){
        res.status(404).json({
            message: "Share link not found"
        })
        return;
    }

    //getting content for the user
    const content = await ContentModel.find({
        userId: link.userId
    })

    //getting info of user
    const user= await UserModel.findOne({
        _id: link.userId
    })

    res.json({
        username: user?.username,
        content: content
    })

})



const PORT = process.env.PORT ; 
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

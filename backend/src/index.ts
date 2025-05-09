import express from "express";
import jwt from "jsonwebtoken";
import { contentModel, linkModel, userModel } from "./db";
import { secret_key } from "./config";
import { contentMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
import { z } from "zod";

const app = express();

app.use(express.json())
app.use(cors());


app.post("/api/v1/signup", async (req, res) => {
    const requiredBody = z.object({
        username: z.string().min(5),
        password: z.string().min(5)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
        return;
    }

    const { username, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ username })
        if (existingUser) {
            res.status(409).json({
                message: "User already exists with that username"
            })
            return;
        }

        await userModel.create({
            username: username,
            password: password
        })
        res.json({
            message: "SignUp Successful"
        })
    } catch (e) {
        console.error(e)

        res.status(500).json({
            message: "Something went wrong. Please try again later."
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const requiredBody = z.object({
        username: z.string().min(5),
        password: z.string().min(5)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
        return;
    }

    const { username, password } = req.body;

    const existingUser = await userModel.findOne({
        username
    })
    if (!existingUser) {
        res.status(404).json({
            message: "Credentials not found."
        })
        return;
    }

    if (password != existingUser.password) {
        res.status(401).json({
            message: "Incorrect Password"
        })
    }
    const token = jwt.sign({
        id: existingUser._id
    }, secret_key);
    res.json({
        token: token
    })

})

app.post("/api/v1/content", contentMiddleware, async (req, res) => {
    const requiredBody = z.object({
        title: z.string().min(1),
        link: z.string().url()
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
        return;
    }

    const { title, link, type, tag} = req.body;
    console.log("Received tag:", tag);
    await contentModel.create({
        title: title,
        link: link,
        type: type,
        tag: tag,
        //@ts-ignore
        userid: req.userid
    })

    res.json({
        message: "Content Added"
    })

})


app.get("/api/v1/content", contentMiddleware, async (req, res) => {
    //@ts-ignore
    const userid = req.userid
    const content = await contentModel.find({
        userid: userid
    }).populate("userid", "username")
    res.json({
        content
    })

})

app.delete("/api/v1/content/:id", async (req, res) => {
    const id = req.params.id;
    await contentModel.deleteOne({
        _id: id
    })
    res.json({
        message: "content removed"
    })
})

app.post("/api/v1/brain/share", contentMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await linkModel.findOne({
            //@ts-ignore
            userid: req.userid
        })
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(20)
        await linkModel.create({
            //@ts-ignore
            userid: req.userid,
            hash: hash
        })

        res.json({
            message: "/share" + hash
        })
    } else {
        await linkModel.deleteOne({
            //@ts-ignore
            userid: req.userid
        })

        res.json({
            message: "Link removed"
        })
    }

})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    //userid
    const content = await contentModel.find({
        userid: link.userid
    })

    const user = await userModel.findOne({
        _id: link.userid
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.put("/api/v1/content/:id", async (req, res) => {
    const id = req.params.id;
    const { title, link, type, tag } = req.body;

    try {
        const updatedNote = await contentModel.findByIdAndUpdate(id,
            { title, link, type, tag },
            { new: true }
        )
        
        if(!updatedNote){
            res.status(404).json({
                message: "Content Not Found"
            })
            return;
        }
        res.status(200).json({
            message: "Content Updated successfully",
            content: updatedNote
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

app.listen(3000)
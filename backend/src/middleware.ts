import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { secret_key } from "./config";

export const contentMiddleware= (req: Request, res: Response, next: NextFunction)=>{
    const header= req.headers["authorization"];
    const decodedHeader= jwt.verify(header as string, secret_key);
    if(decodedHeader){
        //@ts-ignore
        req.userid=decodedHeader.id;
        next();
    }else{
        res.json({
            message: "invalid token"
        })
    } 
}
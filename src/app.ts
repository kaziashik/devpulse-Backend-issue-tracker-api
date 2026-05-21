

import express, { type Application, type Request, type Response } from "express"
export const app: Application=express()


// const port=config.port;

app.get('/',(req: Request, res:Response)=>{
    res.status(200).json({
        success:true,
        message:"Server Home Route",
        data: {}
    })
})




import express, { type Application, type Request, type Response } from "express"
import { app } from "./app";
import { config } from "./config";



const prot= config.port

const main=()=>{

    app.listen(prot,()=>{
    console.log(`Server Runing on Port ${7000}`);
})

}

main()
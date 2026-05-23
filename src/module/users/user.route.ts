import { Router } from "express";
import { UserController } from "./users.controller";

const rout = Router();

rout.post("/signup", UserController.registerUser);
rout.post("/login", UserController.login);

export const UserRouter = rout;

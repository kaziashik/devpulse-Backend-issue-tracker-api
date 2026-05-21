import { Router } from "express";
import { UserController } from "./users.controller";

const rout = Router();

rout.post("/signup", UserController.Registrationuser);
rout.post("/login", UserController.login);

export const UserRouter = rout;

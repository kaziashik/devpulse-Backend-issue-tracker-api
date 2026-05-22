import type { Request, Response } from "express";
import { UserServise } from "./user.service";

const Registrationuser = async (req: Request, res: Response) => {
  try {
    const result = await UserServise.RegistrationUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await UserServise.loginUserService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

export const UserController = {
  Registrationuser,
  login,
};

import type { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utility/sendResponse";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await UserService.registerUserService(req.body);

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.loginUserService(req.body);
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  registerUser,
  login,
};

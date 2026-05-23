import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import sendResponse from "../utility/sendResponse";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    try {
      if (!token) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Unauthoraized access",
        });
      }

      const decode = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;

      req.user = decode;

      return next();
    } catch (error: any) {
      next(error);
    }
  };
};

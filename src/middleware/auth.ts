import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    try {
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthoraized access",
          data: {},
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

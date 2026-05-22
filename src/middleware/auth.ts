import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../db";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    try {
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthoraize access",
          data: {},
        });
      }

      const decode = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;
      //   console.log(decode);

      const userData = await pool.query(
        `
        SELECT id from users WHERE id=$1

        `,
        [decode.id],
      );

      if (userData.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User does not exist",
          data: {},
        });
      }

      req.user = decode;

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error: error.message,
      });
    }
  };
};

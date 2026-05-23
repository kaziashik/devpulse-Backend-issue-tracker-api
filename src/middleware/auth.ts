import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import sendResponse from "../utility/sendResponse";
import { pool } from "../db";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    try {
      if (!token) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthoraized access",
        });
      }

      const decode = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;

      const userData = await pool.query(`SELECT id FROM users WHERE id=$1`, [
        decode.id,
      ]);

      if (userData.rows.length === 0) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "User does not exist",
        });
      }

      req.user = decode;

      return next();
    } catch (error: any) {
      next(error);
    }
  };
};

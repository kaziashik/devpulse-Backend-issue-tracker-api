import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../type/type";

export const DeleteAuth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if(!userRole || !roles.includes(userRole)){
        return res.status(403).json({
          success: false,
          message: "Forbidden: You are not authorized",
        });
    }

    next()
  };
};

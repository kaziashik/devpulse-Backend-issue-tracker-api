import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../type/type";
import { pool } from "../db";

export const checkRole = (...roles: ROLES[]) => {
  return  (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized",
      });
    }
    return next();
  };
};

export const updateIssueAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
   try {
     const userRole = req.user?.role;
    const userId = req.user?.id;
    const issueId = Number(req.params.id);

    const issueData = await pool.query(
      `
            SELECT reporter_id, status FROM issues WHERE id=$1
        `,
      [issueId],
    );

    if (issueData.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    const issue = issueData.rows[0];
    if (userRole === "maintainer") {
      return next();
    }

    if (
      userRole === "contributor" &&
      userId === issue.reporter_id &&
      issue.status === "open"
    ) {
      return next();
    }
    return res.status(403).json({
      success: false,
      message: "Forbidden: You are not authorized",
    });
    
   } catch (error) {
    return next(error)
    
   }
  };
};

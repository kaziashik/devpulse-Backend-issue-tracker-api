import type { NextFunction, Request, Response } from "express";
import { issuesServise } from "./issues.servise";

const createIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const report_id = req.user?.id;
    const result = await issuesServise.createIssueService(req.body, report_id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Invalid reporter ID",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await issuesServise.getAllIssueServise(req.query);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getIssueById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const result = await issuesServise.getIssuesByIdServise(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    return res.status(200).json({
      success: true,
      // message: " Issue retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const result = await issuesServise.updateIssueServise(req.body, id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIssueStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const { status } = req.body;

    const allowedStatus = ["open", "in_progress", "resolved"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }
    const result = await issuesServise.updateIssueStatusService(id, status);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Issue status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteIssue= async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await issuesServise.deleteIssueService(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: " Issue deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getMetrics=async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await issuesServise.getMetricsService();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  getIssueById,
  updateIssues,
  deleteIssue,
  updateIssueStatus,
  getMetrics
};

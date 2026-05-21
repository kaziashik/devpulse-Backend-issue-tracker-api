import type { Request, Response } from "express";
import { issuesServise } from "./issues.servise";

const createIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesServise.createIssueService(req.body);

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to create issue",
      error: error.message,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesServise.getAllIssueServise();

    return res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieved issue",
      error: error.message,
    });
  }
};

const GetissuesById = async (req: Request, res: Response) => {
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
      message: " Issue retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to issue retrieved",
      error: error.message,
    });
  }
};

const updateIssues = async (req: Request, res: Response) => {
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
      message: "Issue update successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to update issue",
      error: error.message,
    });
  }
};

const deletIssue = async (req: Request, res: Response) => {
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
      message: " Issue Deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to Delete issue ",
      error: error.message,
    });
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  GetissuesById,
  updateIssues,
  deletIssue,
};

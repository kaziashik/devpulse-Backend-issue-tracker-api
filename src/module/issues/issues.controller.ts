import type { Request, Response } from "express";
import { issuesServise } from "./issues.servise";

const createIssues = async (req: Request, res: Response) => {
  try {
    const report_id = req.user?.id;
    console.log(" from controlar reporter_id: ", report_id);
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to create issue",
      error: error.message,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  const result = await issuesServise.getAllIssueServise(req.query);

  return res.status(200).json({
    success: true,
    data: result,
  });
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



const updateIssueStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

  const { status } = req.body;
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
  } catch (error: any) {
     return res.status(500).json({
      success: false,
      message: "Failed to update issue status ",
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
  updateIssueStatus
};

import type { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response: any = {
    success: data.success,

    message: data.message,
  };

  if (data.data !== undefined) {
    response.data = data.data;
  }

  if (data.errors !== undefined) {
    response.errors = data.errors;
  }

  return res.status(data.statusCode).json(response);
};

export default sendResponse;

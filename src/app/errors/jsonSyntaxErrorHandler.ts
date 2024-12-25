import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../interface/error";

const jsonSyntaxErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof SyntaxError && "body" in error) {
    // Build the error message using `IGenericErrorMessage`
    const errorMessages: IGenericErrorMessage[] = [
      {
        path: "body",
        message: "The JSON provided in the request body is malformed",
      },
    ];

    // Send the error response
    res.status(599).json({
      success: false,
      message: "Invalid JSON payload",
      errorMessages,
    });
    return;
  }

  next(error);
};

export default jsonSyntaxErrorHandler;

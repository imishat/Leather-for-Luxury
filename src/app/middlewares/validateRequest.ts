import config from "../config";
import { errorlogger } from "../shared/logger";
import { IGenericErrorMessage } from "../interface/error";

import handleValidationError from "../errors/handleValidationError";
import ApiError from "../errors/ApiError";
import { Error } from "mongoose";
import { ZodError } from "zod";
import zodErrorHandler from "../errors/zodErrorHandler";
import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error, "golobal");
  //
  config.env === "development"
    ? console.log("globalErrorHandler", error)
    : errorlogger.error("globalErrorHandler", error);

  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];
  // validation error message
  if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message);
    errorMessages = simplifiedError.errorMessages;
  }

  // zod error handel
  else if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandler(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message);
    errorMessages = simplifiedError.errorMessages;
  }

  // api error message
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  // common error message
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error.stack : undefined,
  });
  next();
};
export default globalErrorHandler;

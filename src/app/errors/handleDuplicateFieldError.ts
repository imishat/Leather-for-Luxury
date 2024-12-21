import { IGenericErrorMessage, ISimplifiedError } from "../interface/error";

export const handleDuplicateFieldError = (error: any): ISimplifiedError => {
  // Extract the duplicate field
  const duplicateField = Object.keys(error.keyValue)[0];
  const duplicateValue = error.keyValue[duplicateField];

  // Construct error message
  const errorMessages: IGenericErrorMessage[] = [
    {
      path: duplicateField,
      message: `The value "${duplicateValue}" for ${duplicateField} must be unique.`,
    },
  ];
  const statusCode = 409;
  return {
    statusCode, // HTTP status for Conflict
    message: "Duplicate key error",
    errorMessages,
  };
};

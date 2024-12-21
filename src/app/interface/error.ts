export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type ISimplifiedError = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

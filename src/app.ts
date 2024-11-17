import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import globalErrorHandler from "./app/middlewares/globalErrorHandler";

import router from "./app/routes";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use("/api/v1", router);
//global error handler
app.use(globalErrorHandler);
//Testing
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Welcome to the API Of Leather-for-Luxury",
    status: "success",
    code: 200,
  });
});

export default app;

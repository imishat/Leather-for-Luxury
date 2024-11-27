import express from "express";
import { USerController } from "./User.controller";

const router = express.Router();

router.post("/create-user", USerController.createUser);
export const USerRoutes = router;

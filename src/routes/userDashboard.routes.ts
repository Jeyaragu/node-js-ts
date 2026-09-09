import express from "express";

import { getUserDashboard } from "#controllers/userDashboard.controller";

const dashBoardRouter = express.Router();

dashBoardRouter.get("/dashboard/:id", getUserDashboard);

export default dashBoardRouter;

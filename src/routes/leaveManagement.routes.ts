import express from "express";
import {
  getAllLeavesByUserId,
  addLeaveRequest,
} from "#controllers/leaveManagement.controller";

const leaveManagementRouter = express.Router();

leaveManagementRouter.get("/:id", getAllLeavesByUserId);
leaveManagementRouter.post("/:id", addLeaveRequest);

export default leaveManagementRouter;

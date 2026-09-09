import { Request, Response } from "express";

const USERS_LEAVES = [
  {
    requestId: 1,
    userId: 1,
    leaveType: "Sick Leave",
    name: "John Doe",
    startDate: "2025-07-01",
    endDate: "2025-07-05",
    status: "Rejected",
    reason: "Medical reasons",
  },
  {
    requestId: 2,
    userId: 2,
    leaveType: "Personal Leave",
    name: "Jane Smith",
    startDate: "2026-07-10",
    endDate: "2026-07-15",
    status: "Approved",
    reason: "Family matters",
  },
  {
    requestId: 3,
    userId: 1,
    leaveType: "Compensatory Leave",
    name: "John Doe",
    startDate: "2026-08-01",
    endDate: "2026-08-01",
    status: "Approved",
    reason: "Worked on a weekend",
  },
];

export const getAllLeavesByUserId = (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const userId = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
    const userLeaves = USERS_LEAVES.filter((leave) => leave.userId === userId);
    if (userLeaves.length === 0) {
      return res
        .status(200)
        .json({ status: false, message: "No leaves found for the user" });
    } else {
      return res.status(200).json({
        status: true,
        data: userLeaves,
        message: "User leaves fetched successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const addLeaveRequest = (req: Request, res: Response) => {
  try {
    const paramId = req.params.id;
    const userId = parseInt(Array.isArray(paramId) ? paramId[0] : paramId);
    const getLastIndex = USERS_LEAVES[USERS_LEAVES.length - 1];
    const leaveRequest = req.body;
    USERS_LEAVES.push({
      userId,
      requestId: getLastIndex.requestId + 1,
      status: "Pending",
      ...leaveRequest,
    });
    res.status(200).json({
      status: true,
      message: "Leave request added successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

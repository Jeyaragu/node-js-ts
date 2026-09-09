import { Request, Response } from "express";
const USERS_DASHBOARD = [
  {
    id: 1,
    task: {
      toDo: 4,
      inProgress: 2,
      done: 5,
    },
    approvedLeaves: 2,
    teamMembers: 5,
  },
];
function error(message: string): never {
  throw new Error(message);
}

export const getUserDashboard = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const userId = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
    const userDashboard = USERS_DASHBOARD.find((user) => user.id === userId);
    if (userDashboard) {
      return res.status(200).json({
        status: true,
        data: userDashboard,
        message: "User dashboard fetched successfully",
      });
    } else {
      return res.status(200).json({ status: false, message: "User not found" });
    }
  } catch (e) {
    return error("Unexpected error occured");
    // res
    //   .status(500)
    //   .json({ status: false, message: "Unexpected error occured" });
  }
};

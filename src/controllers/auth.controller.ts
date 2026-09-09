import { Request, Response } from "express";
const USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    password: "1234",
    role: "admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "active",
    password: "password456",
    role: "user",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "inactive",
    password: "password789",
    role: "user",
  },
];

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findUser = USERS.find(
      (user) => user.email === email && user.password === password,
    );
    if (findUser) {
      return res.status(200).send({
        status: true,
        data: findUser,
        message: "User logged in successfully",
      });
    } else {
      return res.status(200).send({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("--error", error);
    res.status(500).send({
      status: false,
      message: "Unexpected error occured",
    });
  }
};

const saveUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Unexpected error occured",
    });
  }
};

export default {
  login,
  saveUser,
};

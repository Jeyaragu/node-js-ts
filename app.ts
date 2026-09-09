import dotEnv from "dotenv";
import express, { Request, Express, Response } from "express";
import bodyParser from "body-parser";

import authRouter from "#routes/auth.routes";
import userDashboardRouter from "#routes/userDashboard.routes";
import leaveManagementRouter from "#routes/leaveManagement.routes";

dotEnv.config();

const app: Express = express();

const port = Number(process.env.PORT) || 3000;

const allowedOrigins = ["http://localhost:3000", "http://localhost:3010"];

// Example of noUnusedLocals: true, noImplicitAny: true, noUnusedParameters: true and allowUnreachableCode: false example
// function testA(param: string, id) {
//   return param;
//   let unReacable = "str";
// }
// 1. Body Parser Middleware
app.use(bodyParser.json());
// 2. CORS Middleware
app.use((req: Request, res: Response, next: Function) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin!)) {
    res.setHeader("Access-Control-Allow-Origin", origin!);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// 3. Authorization
// app.use((req: Request, res: Response, next: Function) => {
//   const authorizationToken = req.headers.authorization;
//   if (authorizationToken && authorizationToken === process.env.TOKEN) {
//     next();
//   } else {
//      res.status(401).send({
//       status: false,
//       message: "Un Authorized Request",
//     });
//   }
// });
// 3. Routes
app.use("/api", authRouter);
app.use("/api/user", userDashboardRouter);
app.use("/api/user/leaves", leaveManagementRouter);

// 4. Start the server
app.listen(port, () => {
  console.log("Server running with port", port);
});

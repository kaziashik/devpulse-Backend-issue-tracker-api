import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { issuesRouter } from "./module/issues/issues.router";
import { UserRouter } from "./module/users/user.route";
const app: Application = express();

app.use(express.json());

app.use("/api/issues", issuesRouter);
app.use("/api/auth", UserRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server Home Route",
    data: {},
  });
});

app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  },
);

export default app;

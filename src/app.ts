import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { issuesRouter } from "./module/issues/issues.router";
import { UserRouter } from "./module/users/user.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import cors from "cors";
import { config } from "./config";

const app: Application = express();

app.use(
  cors({
    origin: config.client_url,
    credentials: true,
  }),
);

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

app.use(notFound);
app.use(globalErrorHandler);

export default app;

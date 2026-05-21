import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { issuesRouter } from "./module/issues/issues.router";
import { join } from "node:path";
export const app: Application = express();

// const port=config.port;

app.use(express.json());

app.use("/api/issues", issuesRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server Home Route",
    data: {},
  });
});

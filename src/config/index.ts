import path from "path";
import dotenv from "dotenv";


dotenv.config({
  path: path.join(process.cwd(), ".env"),
});


export const config = {
  connection_string: process.env.ONNECTIONSTRING,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,

  refresh_secret: process.env.JWT_REFERESH_SECRET,
}
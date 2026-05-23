import app from "./app";
import { config } from "./config";
import { DBtable } from "./db";

const port = config.port;

const main = async () => {
  try {
    await DBtable();

    app.listen(port, () => {
      console.log(`Server Running on Port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server", error);
  }
};

main();

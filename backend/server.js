import express from "express";

import "dotenv/config";
import chatRouter from "./src/routes/chatRoute.js";
const app = express();
app.use(express.json());
const port = process.env.PORT;
const appName = process.env.APP_NAME;
app.use("/api", chatRouter);
app.listen(port, () => {
  console.log(`${appName} is running at ${port}`);
});

import express from "express";
import cors from "cors";
import "dotenv/config";
import chatRouter from "./src/routes/chatRoute.js";
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const appName = process.env.APP_NAME;
app.use("/api", chatRouter);
app.listen(port, () => {
  console.log(`${appName} is running at ${port}`);
});

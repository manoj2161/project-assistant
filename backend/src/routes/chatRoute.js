import express from "express";
import { getMessage } from "../controllers/chatController.js";
const router = express.Router();

router.post("/chat", getMessage);

export default router;

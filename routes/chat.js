import { authMiddlewareOnlyForUser } from '../middleware/auth.middleware.js';
import express from "express";
import {
  accessChat,
  createGroupChat,
  getMyChats,
  sendMessage,
  getMessages,
} from "../contollers/chat.controller.js";

const router = express.Router();

router.use("/", authMiddlewareOnlyForUser)

router.post("/access", accessChat);
router.post("/group", createGroupChat);
router.get("/", getMyChats);
router.post("/message", sendMessage);
router.get("/m/:chatId/", getMessages);

export default router;

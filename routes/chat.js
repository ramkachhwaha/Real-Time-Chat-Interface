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

router.post("/access", authMiddlewareOnlyForUser, accessChat);
router.post("/group", authMiddlewareOnlyForUser, createGroupChat);
router.get("/", authMiddlewareOnlyForUser, getMyChats);
router.post("/message", authMiddlewareOnlyForUser, sendMessage);
router.get("/:chatId/messages", authMiddlewareOnlyForUser, getMessages);

export default router;

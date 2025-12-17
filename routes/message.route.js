import express from 'express';
import { authMiddlewareOnlyForUser } from '../middleware/auth.middleware.js';
const router = express.Router();

router.use("/", authMiddlewareOnlyForUser);

router.get("/", getUserMessages)

router.post("/", addMessage);


export default router;

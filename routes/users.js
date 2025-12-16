import express from 'express';
import { getUser, updateUser, deleteUser } from '../contollers/user.controller.js';
import { authMiddlewareOnlyForUser } from '../middleware/auth.middleware.js';
const router = express.Router();

router.use("/", authMiddlewareOnlyForUser)
    .put('/', updateUser)
    .delete('/', deleteUser)
    .get('/me', getUser);

export default router;

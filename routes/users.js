import express from 'express';
import { getUser, updateUser, deleteUser } from '../contollers/user.controller.js';
import { authMiddlewareOnlyForUser } from '../middleware/auth.middleware.js';
import { updateUserValidator } from '../validations/user.validate.js';
import { validate } from '../middleware/validatorErrorHandler.js';
const router = express.Router();

router.use("/", authMiddlewareOnlyForUser)
    .delete('/', deleteUser)
    .get('/me', getUser);

router.patch("/",updateUserValidator , validate , updateUser)    

export default router;

import express from 'express';
import { getUser, updateUser, deleteUser, searchUsers, uploadDp } from '../contollers/user.controller.js';
import { authMiddlewareOnlyForUser } from '../middleware/auth.middleware.js';
import { updateUserValidator } from '../validations/user.validate.js';
import { validate } from '../middleware/validatorErrorHandler.js';
import { ImageUpload } from '../config/multer.config.js';
const router = express.Router();

router.use("/", authMiddlewareOnlyForUser)
    .delete('/', deleteUser)
    .get('/me', getUser);

router.patch("/",updateUserValidator , validate , updateUser);

router.patch("/upload-avatar", ImageUpload.single("avatar") ,uploadDp);

router.get("/search",searchUsers);

export default router;

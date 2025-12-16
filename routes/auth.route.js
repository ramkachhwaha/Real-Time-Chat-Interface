import express from 'express';
import { addUser, loginUser } from '../contollers/user.controller.js';
import { registerUserValidator } from '../validations/user.validate.js';
import { validate } from '../middleware/validatorErrorHandler.js';
const router = express.Router();

// POST users registering.
router.post('/register', registerUserValidator, validate, addUser);

//  post users logging in.
router.post('/login', loginUser)

export default router;
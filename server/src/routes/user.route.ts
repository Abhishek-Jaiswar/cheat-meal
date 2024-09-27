import express from 'express';
import { loginHandler, logout, registerHandler } from '../controllers/user.controller';
import { authenticate } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler)
router.post('/logout', authenticate, logout)

export default router;
import { Router } from 'express';

// el controlador
import authController from '../controllers/comments.controller.js';

const router = Router();


router.post("/articles/:id/comments", authController.createComment);


export default router;



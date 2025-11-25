import { Router } from 'express';

// manejo de rutas y archiovs estaticos
import path from "path";
import { fileURLToPath } from "url";

// el controlador
import authController from '../controllers/auth.controller.js';


const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get('/login', (req, res) => {
  res.render("login", {res: null});
});

router.get('/register', (req, res) => {
    res.render("register", {res: null});
});




router.post('/register', authController.register);

router.post('/login', authController.login );

router.post('/logout', authController.handleLogout);


export default router;
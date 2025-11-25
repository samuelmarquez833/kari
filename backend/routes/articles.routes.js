import { Router } from 'express';

// manejo de rutas y archiovs estaticos
import path from "path";
import { fileURLToPath } from "url";

// el controlador
import articlesController from '../controllers/articles.controller.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



router.get('/', articlesController.getArticles);

router.get('/:id', articlesController.getSingleArticle);


export default router;
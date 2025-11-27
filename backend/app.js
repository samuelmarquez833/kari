import express from 'express'

//para poder manejar los estaticos y servirlos y asi
// con esto te mueves por los archiovs de tu carpeta de forma libre sin importar que el OS
import path from "path";
//Para que puedas usar __dirname en proyectos con import. nada más.
import { fileURLToPath } from "url";
// de que  me sirve __ dirname? Para decirle a Express dónde están tus archivos HTML, CSS, imágenes, etc.Nada más.
import authRoutes from './routes/auth.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import articlesRoutes from './routes/articles.routes.js';
import aboutRoutes from './routes/about.routes.js';

import middleware from './middleware/aja.js';

// referente a la session
import session from "express-session";

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ?????
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// justo después de crear app
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


// session
app.use(
  session({
    secret: "un_secreto_x", 
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});




app.get("/",  middleware.aja, (req, res) => {
  res.render("index");
  //console.log(req);
});

app.use('/about', middleware.aja, aboutRoutes)
app.use('/auth', middleware.aja, authRoutes);
app.use('/articles', middleware.aja, articlesRoutes);
app.use('/c', middleware.aja, commentsRoutes);



export default app;



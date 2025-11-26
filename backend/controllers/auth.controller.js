import authService from '../services/auth.service.js';

export async function register(req, res, next) {
    const { username, password } = req.body;

    try {
        
        const user = await authService.registerUser(username, password);        

        req.session.user = {
            id: user.id,
            username: user.username || username,
        };
        
        // console.log(req.session.userId);


        return res.redirect("/"); 
    
        /*
        res.status(201).json({
            message: 'Usuario registrado y logueado',
            user,
        });
        */

    } catch (error) {
        console.error("Error en el registro:", error);

        if (error.code === "USERNAME_ALREADY_IN_USE") {
            return res.render("register", {
                res: "Usuario ya registrado, otro nombre necesario",
                username, 
            });
        }

        return res.status(500).render("register", {
            res: "Ocurrió un error inesperado",
            username,
        });
    }
}



export async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await authService.loginUser(username, password);

//        req.session.user = { id: user.id };
        req.session.user = {
            id: user.id,
            username: user.username || username,
        };

        return res.redirect("/"); // aquí NO se pasan datos, SOLO se redirige

        /*res.status(201).json({
            essage: 'Usuario logueado',
            user,
        });*/

    } catch (error) {
        if (error.code === 'USER_NOT_EXISTS') {
            return res.render("register", {
                res: "Credenciales Incorrectas",
                username, 
            });
        } else if (error.code === 'DB_ERROR'){
            return res.status(500).render("login", {
                res: "Ocurrió un error inesperado",
                username,
            });
        }    
    }
}


export function handleLogout(req, res) {
  req.session.destroy(err => {
    if (err) {
        console.error('Error al destruir sesión:', err);
        console.log ('algo anda mal con el cerrar sesion');
        return res.status(500).json({ error: 'No se pudo cerrar sesión' });
    }
    res.clearCookie('connect.sid'); 
    return res.redirect("/");

  });
}



export default { register, login, handleLogout };
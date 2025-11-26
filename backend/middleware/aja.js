

export function aja (req, res, next){
    res.locals.user = req.session.user || null; // user estará disponible en TODOS los .ejs
    next();
}


export default { aja };
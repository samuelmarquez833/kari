

export function aja (req, res, next){
    console.log(req.session);
    next();
}


export default { aja };
import authService from '../services/comments.service.js';



export async function createComment(req, res, next) {




    const articleId = req.params.id;
    const {comment} = req.body;
    // cambiar a const y borrar el userId de abajo
    let userId = req.session?.user || null;
    console.log(userId);
    console.log('porno');


    if (userId == null){
        console.log('el usuario no ha inicado sesion');
        return res.redirect(`/auth/login`);
    }


    try{
 
    const positive_output_i_guess = await authService.createCommentService(articleId, comment, userId);

    const message = positive_output_i_guess.message;


    return res.redirect(`/articles/${articleId}`);

    } catch(error){
        console.error(`paso un error papi: ${error}`);
        if (error.code === 'DB_ERROR_CREATING_COMMENT') {
            return res.render('article', {
                res: "Error al publicar el comentario",
            });
        }
    }
}
























export default { createComment };
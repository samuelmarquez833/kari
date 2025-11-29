import authService from '../services/comments.service.js';
import articlesService from '../services/articles.service.js';



export async function createComment(req, res, next) {




    const articleId = req.params.id;
    const {comment} = req.body;
    let userId = req.session?.user || null;

    if (userId == null){
        console.log('el usuario no ha inicado sesion');
        return res.redirect(`/auth/login`);
    }

    let db_response;


    try{
    const positive_output_i_guess = await authService.createCommentService(articleId, comment, userId.id);
    db_response = await articlesService.getSingleArticleService(articleId);
    const message = positive_output_i_guess.message;
  
    
    res.redirect(`/articles/${articleId}`);

    } catch(error){
        console.log(error)
        console.error(`paso un error papi: ${error}`);
        if (error.code === 'DB_ERROR_CREATING_COMMENT') {
            res.render('article', {
                error: true,
                all: db_response  
            });
        }

       console.log('cumshot cumshot cumshot cumshot cumshot cumshot cumshot');
    }
}
























export default { createComment };
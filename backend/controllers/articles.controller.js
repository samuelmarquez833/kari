import { error } from 'console';
import articlesService from '../services/articles.service.js';

export async function getArticles(req, res, next) {
    
    try{

        const db_call = await articlesService.getArticlesService();

        
        const descs = [];

        
        res.render('articles', {
            error: false,
            all: db_call,
            
        });
        

    }catch(e){
        console.log(e);
        if(e.code == 'DB_INTERNAL_ERROR'){
            res.render('articles', {
                error: true
            }); 
        } 
    }
}

















/*


    try{
        const db_call = await articlesService.getSingleArticleService(id);
        console.log(db_call);


*/





export async function getSingleArticle(req, res, next) {

    const {id} = req.params;     

    try{
        
        const db_call = await articlesService.getSingleArticleService(id);
        //console.log(db_call);

        res.render('article', {
            error: false,
            all: db_call,    
        });
        

    }catch(e){
        console.log(e);
        if(e.code == 'DB_INTERNAL_ERROR'){
            res.render('articles', {
                error: true
            }); 
        } 
    }

}


export default { getArticles, getSingleArticle};

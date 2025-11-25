import client from '../db/db.js';



export async function getArticlesService(article_id) {

    try{
        const row = await client.query('SELECT * FROM articles');
        
        return row.rows;

    } catch(e){
        e.code = 'DB_INTERNAL_ERROR';
        throw e;   
    }
}



export async function getSingleArticleService(article_id) {
    try{
        const article = await client.query('SELECT * FROM articles WHERE id = ($1)', [article_id]);
        const comments = await client.query('SELECT * FROM comments WHERE article_id = ($1)', [article_id])
//      console.log(article.rows[0].title);
        

        for (const comment of comments.rows){
            let memeber = await client.query('SELECT username FROM users WHERE id = ($1)', [comment.user_id]);    
            comment.username = memeber.rows[0].username
        };

        //console.log(comments.rows);

        
        return{
            title: article.rows[0].title,
            id: article.rows[0].id,
            content: article.rows[0].body,
            date: article.rows[0].created_at,
            comments: comments.rows    
        }
        
        


    } catch(e){
        e.code = 'DB_INTERNAL_ERROR';
        throw e;   
    }
}




export default { getArticlesService, getSingleArticleService };
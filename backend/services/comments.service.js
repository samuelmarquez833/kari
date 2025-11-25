import client from '../db/db.js';


export async function createCommentService(articleId, content, userId) {

    try{



        await client.query('INSERT INTO comments(article_id, content, user_id) VALUES($1, $2, $3)', [articleId, content, userId]);
    
        return {
            message: 'todo bien'
        };
        
    } catch(e){
        e.code = 'DB_ERROR_CREATING_COMMENT';
        throw e; 
    }
}


export default { createCommentService}